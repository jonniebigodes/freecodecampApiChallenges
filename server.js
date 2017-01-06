var express= require('express');
var path= require('path');
var Utilities= require('./Challenges/Utils.js')
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
 * endpoint general for handling and rendering the page with all the challenges(api)
 */
app.get('/',function(request,response){
    response.sendFile(__dirname + '/dist/index.html');
});


app.get('/time',function(request,response){
    response.end('Soon you get the time');
});
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
 * endpoint for url shortener challenge
 */
app.get('/urlshort',function(request,response){

});


app.get('/imagesearch',function(request,response){

});

app.get('/latest/imagesearch',function(request,response){

});

/**
 * endpoint for file metadata challenge
 */
app.get('/filemeta',function(request,response){
    response.render('views/metadata');
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