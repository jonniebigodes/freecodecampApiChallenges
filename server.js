import "babel-polyfill";
import { unlink } from 'fs';
import mongoose from 'mongoose';
import express from 'express';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import logger from './logger';

console.log(`process.env.NODE_ENV=>${process.env.NODE_ENV}`);

const UserModel= process.env.NODE_ENV!=='production'?require('./src/models/Users.model').default:require('./Users.model').default;
const UrlModel=process.env.NODE_ENV!=='production'?require('./src/models/Urls.model').default:require('./Urls.model').default;
const ExerciseModel= process.env.NODE_ENV!=='production'?require('./src/models/Exercises.model').default:require('./Exercises.model').default;
const SearchModel= process.env.NODE_ENV!=='production'?require('./src/models/Searches.model').default:require('./Searches.model').default;
const SearchResultsModel= process.env.NODE_ENV!=='production'?require('./src/models/Searchresults.model').default:require('./Searchresults.model').default;

const parseMetadataHeader=process.env.NODE_ENV!=='production'?require('./src/Challenges/headerChallenge/headerParser').default:require('./headerParser').default;
const createShortUrl=process.env.NODE_ENV!=='production'?require('./src/Challenges/UrlshortChallenge/UrlShortener').default:require('./UrlShortener').default;
const getDateInfo= process.env.NODE_ENV!=='production'?require('./src/Challenges/timeCheckChallenge/timeChecker').default:require('./timeChecker').default;
const ExerciseChecks= process.env.NODE_ENV!=='production'?require('./src/Challenges/ExerciseTracker/Exercise').ExerciseChecks:require('./Exercise').ExerciseChecks;
const searchImages= process.env.NODE_ENV !== 'production'?require('./src/Challenges/imageSearch/ImgSearcher').default:require('./ImgSearcher').default;

const router= express.Router();
const app = express();
// set the port for the app
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api',router);
// checks if app in production mode and sets the config items from the webconfig file
if (process.env.NODE_ENV!=='production'){
    const config= require('dotenv').config();
    app.use(express.static(path.join(__dirname, 'dist')));
}

//
if (process.env.NODE_ENV!=='production'){
    app.set('MONGODB','mongodb://localhost:27017/freecodecampapichallenges')
}
else{
    app.set('MONGODB', process.env.PROD_MONGODB);
}
app.set('GOOGLE_KEY', process.env.GOOGLE_KEY);
app.set('GOOGLE_CX', process.env.GOOGLEAPICX);

router.use((req, res, next) => {
    logger.info(`Time=>${new Date()}\n method=>${req.method}\n url=>${req.url}`);
    next(); // make sure we go to the next routes and don't stop here
});

// #region whoami endpoint
/**
 * endpoint for the request header parser challenge
 * @param request contains the request data from the user
 * @param response will send the response to the user
 */
router.get('/whoami',  (req, res) => {
   return res.json(parseMetadataHeader(req));
});
// #endregion

// #region upload route
/**
 * endpoint for the File Metadata Microservice challenge
 * @param request contains the request data from the user
 * @param response will send the response to the user
 */
router.post('/files', multer({
    dest: './uploads/'
}).single('upl'), (request, response) => {
    const item = {
        fileName: request.file.originalname,
        filetype: request.file.mimetype,
        FileSize: request.file.size
    };
    unlink(`./uploads/${request.file.filename}`, (err) => {
        if (err) {
            return response.status(500).end(`error deleting file ${request.file.originalname}`);
        } 
        return response.json(item);
    });
});
// #endregion

// #region time 
/**
 * endpoint for time conversion
 * @param request contains the request coming from the client
 * @param response contains the response for the client
 */
router.post('/time',  (req, res) => {
    // res.json({message:'soon'});
    const result= getDateInfo(req.body.time);
    return res.json(result);
});
// #endregion

// #region route short
router.route('/short')
.get(async(req,res) => {
    try {
        await mongoose.connect(app.get('MONGODB'),{autoIndex: false, // Don't build indexes
        reconnectTries: 100, // Never stop trying to reconnect
        reconnectInterval: 2000, // Reconnect every 2000ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        bufferCommands:false});
        const listofurls= mongoose.model('url');
        const result= await listofurls.find({});
        const items= result.map(item=>{
            return {shortid:item.urlid,destination:item.urllink}
        })
        mongoose.disconnect();
        return res.json(items);

    } catch (error) {
        logger.error(`error connecting to db:${JSON.stringify(error)}`)
        return res.status(500).json({message:'Something very bad happened in the server!!!!'});
    }
})
.post(async (req,res)=>{
    try {
        await mongoose.connect(app.get('MONGODB'),
        {
            autoIndex: false, // Don't build indexes
            reconnectTries: 100, // Never stop trying to reconnect
            reconnectInterval: 2000, // Reconnect every 2000ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            bufferCommands:false
        });
        const urlmodel= mongoose.model('url');
        const savedurls= await urlmodel.find({});
        const urlinplace=savedurls.find(x=>x.urllink===req.body.url);
        if (urlinplace){
            mongoose.disconnect();
            return res.status(500).json({message:'url already added'});
        }
        const result= createShortUrl({url:req.body.url,urls:savedurls});
        if (result.shortId===-1){
            mongoose.disconnect();
            return res.status(500).json({message:'Invalid URL'});
        }
        await urlmodel.create({urlid:result.shortId,urllink:req.body.url});
        await mongoose.disconnect();
        
        return res.status(201).json(
            {
                original_url:req.body.url,
                short_url:result.shortened_url
            }
        );
    } catch (error) {
        logger.error(`error connecting to db:${error}`)
        return res.status(500).json({message:'Something very bad happened in the server!!!!'});
    }
});

router.get('/short/:id',async(req,res)=>{
    const isNumeric=/^\d+$/.test(req.params.id);
    
    if (!isNumeric){
        return res.status(500).json({message:"The value sent is not numeric, or not in conformity with the requested"});
    }
    try {
        await mongoose.connect(app.get('MONGODB'),
        {
            autoIndex: false, // Don't build indexes
            reconnectTries: 100, // Never stop trying to reconnect
            reconnectInterval: 2000, // Reconnect every 2000ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            bufferCommands:false
        });
   
        const urlmodel= mongoose.model('url');
        const searchparam=parseInt(req.params.id,10);
        const savedurls= await urlmodel.findOne({urlid:searchparam});
        if (savedurls){
            mongoose.disconnect();
            return res.redirect(savedurls.urllink);
        }
        mongoose.disconnect();
        return res.status(500).json({message:'The submitted item is not present'});
        
        
    } catch (error) {
        logger.error(`error connecting to db:${error}`)
        return res.status(500).json({message:'Something very bad happened in the server!!!!'});
    }
});
// #endregion

// #region exercice tracker users
router.post('/exercise/newuser',async (req,res)=>{
    if (!req.body.user){
        return res.status(500).json({message:'no username provided'});
    }
    try {
        await mongoose.connect(app.get('MONGODB'),
        {
            autoIndex: false, // Don't build indexes
            reconnectTries: 100, // Never stop trying to reconnect
            reconnectInterval: 2000, // Reconnect every 2000ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            bufferCommands:false
        });
        const usrmodel= mongoose.model('user');
        const savedusr= await usrmodel.findOne({username:req.body.user});
        if (savedusr!==null){
            await mongoose.disconnect();
            return res.status(500).json({message:'username already present'});
        }
        const result=await usrmodel.create({username:req.body.user});
        await mongoose.disconnect();
        return res.status(201).json({message:'user created',userid:result.numseq});

    } catch (error) {
        logger.error(`error connecting to db:${error}`)
        return res.status(500).json({message:'Something very bad happened in the server!!!!'});
    }
});
// #endregion

// #region exercises
router.route('/exercise')
.get(async(req,res)=>{
    if (!req.query.user){
        return res.status(500).json({message:'no user provided'});
    }
    if (!ExerciseChecks.checkNumeric(req.query.user)){
        return res.status(500).json({message:'provided id is not valid'});
    }
    try {
        await mongoose.connect(app.get('MONGODB'),
        {
            autoIndex: false, // Don't build indexes
            reconnectTries: 100, // Never stop trying to reconnect
            reconnectInterval: 2000, // Reconnect every 2000ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            bufferCommands:false
        });
        const exercisemodel= mongoose.model('exercise');
        if (req.query.limit && ExerciseChecks.checkNumeric(req.query.limit)){
            const limitedex=await exercisemodel.find(ExerciseChecks.ExerciseBuild(
                {
                    from:req.query.from,
                    to:req.query.to,
                    user:req.query.user
                }))
            .limit(parseInt(req.query.limit,10));
            await mongoose.disconnect();
            
            return res.status(200).json(limitedex.length?{message:'got something',items:limitedex.map(item=>{
                return {
                    description:item.exercisedescription,
                    duration:item.exerciseduration,
                    by:item.user
                };
            })}:{message:'Nothing found',items:[]});
        }
        const nolimitex=await exercisemodel.find(ExerciseChecks.ExerciseBuild(
            {
                from:req.query.from,
                to:req.query.to,
                user:req.query.user
            }
        ));
        await mongoose.disconnect();
        return res.status(200).json(nolimitex.length?{message:'got something',items:nolimitex.map(item=>{
            return {
                description:item.exercisedescription,
                duration:item.exerciseduration,
                by:item.user
            };
        })}:{message:'Nothing found',items:[]});
    } catch (error) {
        logger.error(`error connecting to db:${error}`)
        return res.status(500).json({message:'Something very bad happened in the server!!!!'});
    }
})
.post(async(req,res)=>{
    if (!req.body.userdata){
        return res.status(500).json({message:'no username provided'});
    }
    if (!req.body.desc){
        return res.status(500).json({message:'no exercice description provided'});
    }
    if(!req.body.duration){
        return res.status(500).json({message:'no exercice duration provided'});
    }
    if (!ExerciseChecks.checkNumeric(req.body.duration)){
        return res.status(500).json({message:'exercise duration invalid'});
    }
    
    try {
        await mongoose.connect(app.get('MONGODB'),
        {
            autoIndex: false, // Don't build indexes
            reconnectTries: 100, // Never stop trying to reconnect
            reconnectInterval: 2000, // Reconnect every 2000ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            bufferCommands:false
        });
        const exercisemodel= mongoose.model('exercise');
        const savedexercises= await exercisemodel.findOne(
            {
                exercisedescription:req.body.desc,
                exerciseduration:parseInt(req.body.duration,10)
            }
        );
        if(savedexercises){
            mongoose.disconnect();
            return res.status(500).json({message:'a similar exercise was already provided'}); 
        }
        if (req.body.exercisedate && ExerciseChecks.isValidDate(req.body.exercisedate)){
            await exercisemodel.create(
                {
                    user:req.body.userdata,
                    exercisedescription:req.body.desc,
                    exerciseduration:parseInt(req.body.duration,10),
                    created:ExerciseChecks.formatDate(req.body.exercisedate)
                })
        }
        else{
            await exercisemodel.create(
                {
                    user:req.body.userdata,
                    exercisedescription:req.body.desc,
                    exerciseduration:parseInt(req.body.duration,10)

                }
            )
        }
        
        await mongoose.disconnect();
        return res.status(201).json({message:'Exercise was created with success'});

    } catch (error) {
        logger.error(`error connecting to db:${error}`)
        return res.status(500).json({message:'Something very bad happened in the server!!!!'});
    }
});
// #endregion

// #region imagesearch
/**
 * endpoint for imagesearch challenge
 * @param request contains the request data from the user
 * @param response will send the response to the user
 * @param offset (optional item to get the number of items in the search)
 */
router.get('/imagesearch',async(req,res)=>{
    if (!req.query.searchquery){
        return res.status(500).json({message:'cannot search nothing'});
    }
    try {
        await mongoose.connect(app.get('MONGODB'),
        {
            autoIndex: false, // Don't build indexes
            reconnectTries: 100, // Never stop trying to reconnect
            reconnectInterval: 2000, // Reconnect every 2000ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            bufferCommands:false
        });
        const savedSearches= mongoose.model('search');
        const savedsearchresults= mongoose.model('searchresult');
        const resultsavedSearches= await savedSearches.findOne({searchwords:req.query.searchquery});
        if (resultsavedSearches){
            const resultsquery= await savedsearchresults.find({idsearch:resultsavedSearches.searchid});
            await mongoose.disconnect();
            return res.status(200).json(
                {
                    query:resultsavedSearches.searchwords,
                    numresults:resultsavedSearches.numresults,
                    queryresults:resultsquery.length?resultsquery.map(item=>{
                        return {
                            name:item.titleimage,
                            link:item.urllink,
                            width:item.width,
                            height:item.height,
                            thumbHeight:item.thumbnailHeight,
                            thumbWidth:item.thumbnailWidth,
                            sizefile:item.filesize
                        }
                    }):[]
                }
            )
        }
        const isNumeric=/^\d+$/.test(req.query.numitems);
        const makeSearch= await searchImages({
            key:app.get('GOOGLE_KEY'),
            cx:app.get('GOOGLE_CX'),
            items:isNumeric?parseInt(req.query.numitems,10):10,
            query:req.query.searchquery
        });
        const newSearch= await savedSearches.create({
            searchwords:req.query.searchquery,
            numresults:isNumeric?parseInt(req.query.numitems,10):10
        });
        const newSearchResults=makeSearch.searchresults.map(item=>{return Object.assign({},item,{idsearch:newSearch.searchid})});
        await savedsearchresults.create(newSearchResults);
        await mongoose.disconnect();
        return res.status(200).json({query:req.query.searchquery,numresults:isNumeric?parseInt(req.query.numitems,10):10,queryresults:makeSearch.searchresults});
        
        
    } catch (error) {
        logger.error(`error connecting to db:${error}`);
        return res.status(500).json({message:'Something very bad happened in the server!!!!'});
    }
    
});
/**
 * endpoint for imagesearch challenge(latest images)
 * @param request contains the request data from the user
 * @param response will send the response to the user
 * 
 */
router.get('/imagesearch/latest',async(req,res)=>{
    try {
        await mongoose.connect(app.get('MONGODB'),
        {
            autoIndex: false, // Don't build indexes
            reconnectTries: 100, // Never stop trying to reconnect
            reconnectInterval: 2000, // Reconnect every 2000ms
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: 0,
            bufferCommands:false
        });
        const savedSearches= mongoose.model('search');
        const resultsavedSearches= await savedSearches.find({});
        await mongoose.disconnect();
        return res.status(200).json(
            {
                latestsearches:resultsavedSearches.map(item=>{
                    return {
                        searchquery:item.searchwords,
                        results:item.numresults
                    };
                })
            }
        );
    } catch (error) {
        logger.error(`error connecting to db:${error}`)
        return res.status(500).json({message:'Something very bad happened in the server!!!!'});
    }
})
// #endregion

// #region server port listen and route * response
/**
 * function to set up the listener for the requests
 * @param port is the port defined above
 * @param callback is the callback to be activated
 * 
 */
app.get('*', (req,response) => {
    if (process.env.NODE_ENV!=='production'){
        return response.sendFile('index.html',{root:path.join(__dirname,'./dist/')});
    }
    // process.env.NODE_ENV!=='production'?
    // response.sendFile('index.html',{root:path.join(__dirname,'./dist/')}):
    return response.sendFile('index.html',{root:path.join(__dirname,'../dist/')});
    // response.sendFile(`${__dirname  }/dist/index.html`);
});

app.listen(app.get('port'), (error) => {
    if (error) {
        logger.error(`error freecodecampdyn:${error}`);
    } else {
        logger.info(`freecodecamp app is running on port ${app.get('port')}`);
    }
});
// #endregion

export default app;