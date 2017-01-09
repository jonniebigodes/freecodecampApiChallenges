var fs= require('fs');
var express= require('express');
var path= require('path');
var Utilities= require('./Challenges/Utils.js')
var multer= require('multer');
var app=express();



// set the port for the app
app.set('port',(process.env.PORT||5000));



if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);
  
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}


app.use(express.static(path.join(__dirname, 'dist')));


/**
 * endpoint for the request header parser challenge
 */
app.get('/whoami',function(request,response){
    /*
    response.end('soon you will know');
    */
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(Utilities.getClientInfo(request)));
    
});

/**
 * endpoint for the File Metadata Microservice challenge
 */
app.post('/api/files', multer({dest:'./uploads/'}).single('upl'),function(request,response){
    //console.losg(request.body);
    //console.log(request.file);
    var item={fileName:request.file.originalname,filetype:request.file.mimetype,FileSize:request.file.size};
    fs.unlink('./uploads/'+request.file.filename,function (err){
        if (err){
            //console.log("error deleting file"+ item.fileName);
            response.status(500).send("error deleting file"+ item.fileName);
        }
        else{
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end(JSON.stringify(item));
        }
    });
    
    

});


app.get('*',function(request,response){
    response.sendFile(__dirname + '/dist/index.html');
    //response.sendfile(path.resolve(__dirname,'dist','index.html'));
});

/**
 * endpoint general for handling and rendering the page with all the challenges(api)
 

app.get('/',function(request,response){
    response.sendFile(__dirname + '/dist/index.html');
});
*/

/*
app.get('/',function(request,response){
    response.sendFile(__dirname + '/dist/index.html');
});
*/
/**
 * endpoint for time parser challenge
 * request params accepted
 *  1-1-1999 (dd-mm-yyyy)
 *  1-December-1999 
 *  1 December 1999 (dd mm yyyy)
 *  1-1-1999 ()
 *  


app.get('/time/:dataTime',function(request,response){

    //response.end('Soon you get the time');
    //console.log("param: " + request.params.dataTime);
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(Utilities.getTimeInformation(request.params.dataTime)));

});
 */


/**
 * endpoint for url shortener challenge
 */
app.get('/urlshort',function(request,response){
    response.end('Soon you get the time');
});


app.get('/imagesearch',function(request,response){
    response.end('Soon you get the time');
});

app.get('/latest/imagesearch',function(request,response){
    response.end('Soon you get the time');
});

/**
 * endpoint for file metadata challenge
 */
app.get('/filemeta',function(request,response){
    response.end('Soon you get the time');
});




/**
 * function to set up the listener for the requests
 * 
 */
app.listen(app.get('port'),function(error){
    if (error){
        console.log("error freecodecampApi: "+ error)
    }
    else{
        console.info("freecodecamp app is running on port",app.get('port'));
    }
    
});