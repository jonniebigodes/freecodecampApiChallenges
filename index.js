var express= require('express');

var app=express();

app.set('port',(process.env.PORT||5000));


/**
 * endpoint general for handling and rendering the page with all the challenges(api)
 */
app.get('/',function(request,response){
    response.render('pages/index');
});


app.get('/time',function(request,response){
    response.end('Soon you get the time');
});
/**
 * endpoint for the request header parser challenge
 */
app.get('/whoami',function(request,response){
    response.end('soon you will know who you are');
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
    
});

/**
 * function to set up the listener for the requests
 * 
 */
app.listen(app.get('port'),function(){
    console.log("freecodecamp app is running on port",app.get('port'));
});