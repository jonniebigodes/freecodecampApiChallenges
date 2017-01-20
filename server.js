
var fs= require('fs');
var express= require('express');
var path= require('path');
var Utilities= require('./Challenges/Utils.js');
var dbfac= require('./Challenges/dbFactory.js');
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

if (process.env.NODE_ENV==='production'){
    app.set('MONGODB',process.env.PROD_MONGODB);
}
else{
    app.set('MONGODB','mongodb://localhost:27017/urlshort');
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

app.get('/api/:searchEngine/:searchWords/(:offset)',function(request,response){
    
});

/**
 * endpoints for url shortener challenge
 * endpoint to get all documents
 */

app.get('/api/listurls',function(request,response){
    dbfac.connect(app.get('MONGODB'),function(){
        dbfac.getAllDocuments("urls",function(returnvalue){
            dbfac.close();
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end(JSON.stringify(returnvalue));
        });
    });
});
/**
 * endpoints for url shortener challenge
 * endpoint to insert urls
 */
app.get('/api/newurl/*',function(request,response){
    if(Utilities.UrlValidate(request.params[0])){
        dbfac.connect(app.get('MONGODB'),function(){
            console.log("Connected to MongoDb.\nRunning instance on "+ app.get('MONGODB'));
            dbfac.getAllDocuments("urls",function(returnvalue){
                let urlShortened= Utilities.ShortenUrl(request.params[0],returnvalue);
                if (urlShortened.original_url==="NOK"){
                    response.end("The url: "+ request.params[0]+" has been already introduced");
                }
                else{
                    
                    dbfac.insertDocumentDb('urls',urlShortened,function(insReturn){
                        
                    });
                    dbfac.close();
                    response.writeHead(200,{'Content-Type':'application/json'});
                    response.end(JSON.stringify({original_url:urlShortened.original_url,short_url:urlShortened.shortened_url}));
                }
                
                
            });
        
        //dbfac.getItembyName('urls',paramadd);
        });
    }
    else{
        response.end("The url provided is not in the correct form");
    }

    //console.log('params:'+ request.params[0]);
    //response.end('soon you will know url '+request.params[0]);
});


/**
 * endpoint to redirect(clean console.log)
 */
app.get('/api/short/:id',function(request,response){
    if (Utilities.CheckNum(request.params.id)){
        dbfac.connect(app.get('MONGODB'),function(){
            console.log("Connected to MongoDb.\nRunning instance on "+ app.get('MONGODB'));
            let paramadd= parseInt(request.params.id);
            dbfac.getItembyId("urls",paramadd,function(returnvalue){
                //console.log(returnvalue);
                //console.log("SERVER GOT RESPONSE from db:\nurl: "+returnvalue.idUrl+"\npath: "+returnvalue.urlpath);
                dbfac.close();
                if (returnvalue.idUrl<0){
                    response.end("The value sent is not registered with the service");
                }
                else{
                    response.redirect(returnvalue.urlpath);
                }
            });
        });
    }
    else{
        response.end("The value sent is not numeric, or not in conformity with the requested");
    }
    
    //console.log("mongodb url:\n"+app.get('MONGODB'));
    //dbfac.getItembyId(request.params.id);

    //response.end('param used: '+request.params.id);

   
});
//

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




app.get('/imagesearch',function(request,response){
    response.end('Soon you get the time');
});

app.get('/latest/imagesearch',function(request,response){
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