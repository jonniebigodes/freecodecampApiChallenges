var fs = require('fs');
var express = require('express');
var path = require('path');
var Utilities = require('./Challenges/Utils.js');
var dbfac = require('./Challenges/dbFactory.js');
var httpService = require('./Challenges/httpService.js');
var multer = require('multer');
var app = express();

// set the port for the app
app.set('port', (process.env.PORT || 5000));


//checks if app in production mode and sets the config items from the webconfig file
if (process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('./webpack.config');
    var compiler = webpack(config);
    var configEnv = require('dotenv').config();
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
}
//

if (process.env.NODE_ENV === 'production') {
    app.set('MONGODB', process.env.PROD_MONGODB);

} else {
    app.set('MONGODB', 'mongodb://localhost:27017/urlshort');
}
app.set('GOOGLE_KEY', process.env.GOOGLEAPI);
app.set('GOOGLE_CX', process.env.GOOGLEAPICX);

app.use(express.static(path.join(__dirname, 'dist')));




/**
 * endpoint for the request header parser challenge
 */
app.get('/whoami', function (request, response) {
    /*
    response.end('soon you will know');
    */
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });
    response.end(JSON.stringify(Utilities.getClientInfo(request)));

});

/**
 * mock endpoint for http request testing purposes
 */
app.get('/api/mock', function (request, response) {
    //httpService.mockGoogleRequest();
    httpService.mocktwitter();
    response.end('MOCKING');
});



/**
 * endpoint for imagesearch challenge
 * @param request contains the request data from the user
 * @param response will send the response to the user
 * @param engine which will be used to search(all- searches using google and instagram and twitter; google only google;tw only twitter insta only instagram)
 * @param keywords the terms of the search
 * @param offset (optional item to get the number of items in the search)
 */
app.get('/api/imgsearch', function (request, response) {
    var tmpItemSearch = {
        engineused: "",
        wordsSearch: "",
        Queryoffset: 0,
        googleApiKey: "",
        googleApiCx: "",
        apiTwitterConsumerKey: "",
        apiTwitterConsumerSecret: "",
        isTwitterAuth: false,
        apiInstagramKey: "",
        apiInstagramSecret: "",
        isInstaAuth: false
    };
    if (request.query.engine !== "google") {
        response.status(500).send("NOT YET");
        return;
    }


    if (request.query.offset) {
        if (request.query.offset > 99) {
            response.send("Are you kidding?That's too many items to search");
            return;
        }
        tmpItemSearch.Queryoffset = request.query.offset;
        //response.end("engine to use: "+request.query.engine+" used words: "+request.query.keywords+" offset: "+request.query.offset);
    } else {
        tmpItemSearch.Queryoffset = 10;

    }

    console.log("SERVER OFFSET SEND:\n" + tmpItemSearch.Queryoffset);
    //response.end("OFFSET:"+tmpItemSearch.offset +" numQueries"+ parseInt(tmpItemSearch.offset/10));


    //
    if (request.query.engine === "google") {
        tmpItemSearch.googleApiKey = app.get('GOOGLE_KEY');
        tmpItemSearch.googleApiCx = app.get('GOOGLE_CX');
    }

    tmpItemSearch.wordsSearch = request.query.keywords;
    tmpItemSearch.engineused = request.query.engine;
    // verificar se a pesquisa ja foi feita mongodb sim devolve os resultados caso contrario processa a pesquisa
    dbfac.connect(app.get('MONGODB'), function () {
        dbfac.getSearchQueryByName("searches", tmpItemSearch, function (err, searchedId) {
            if (searchedId >= 0) {
                dbfac.getSearchResultsByID("searchresults",searchedId,function(err,data){
                    if(err){
                        dbfac.close();
                        response.send("UPS Something went wrong");
                        return;

                    }
                    if(data){
                        dbfac.close();
                        response.send(JSON.stringify(data));
                        
                    }
                });

            } else {
                var sanitizedItemSearch = Utilities.imagesSearch(tmpItemSearch);
                httpService.GetServerInfo(sanitizedItemSearch, function (resultSearch) {
                    if (resultSearch.status === 500) {
                        dbfac.close();
                        response.send("UPS Something went wrong");
                    } else {
                        dbfac.insertDbSearch("searches", tmpItemSearch, function (err, searchidresult) {
                            dbfac.insertSearchResults("searchresults", sanitizedItemSearch.numQueries, resultSearch, searchidresult, function (err, data) {
                                if (err) {
                                    console.log("ERROR inserting data\n" + err);
                                }
                                if (data) {
                                    console.log("insertion: " + data);
                                }
                                dbfac.close();
                            });
                        });
                        response.send(JSON.stringify(resultSearch));
                    }
                })
            }
        });
    });








    //response.send(JSON.stringify(sanitizedItemSearch));


});
/**
 * endpoint to get the latest searches
 */
app.get('/api/img/latest', function (request, response) {
    dbfac.connect(app.get('MONGODB'), function () {
        dbfac.getAllSearches("searches", function (returnvalue) {
            response.send(JSON.stringify(returnvalue));
            dbfac.close();
        });
    })
});

/**
 * endpoints for url shortener challenge
 * endpoint to get all documents
 */

app.get('/api/listurls', function (request, response) {
    dbfac.connect(app.get('MONGODB'), function () {
        dbfac.getAllDocuments("urls", function (returnvalue) {
            dbfac.close();
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(returnvalue));
        });
    });
});
/**
 * endpoints for url shortener challenge
 * endpoint to insert urls
 */
app.get('/api/newurl/*', function (request, response) {
    if (Utilities.UrlValidate(request.params[0])) {
        dbfac.connect(app.get('MONGODB'), function () {
            console.log("Connected to MongoDb.\nRunning instance on " + app.get('MONGODB'));
            dbfac.getAllDocuments("urls", function (returnvalue) {
                let urlShortened = Utilities.ShortenUrl(request.params[0], returnvalue);
                if (urlShortened.original_url === "NOK") {
                    response.end("The url: " + request.params[0] + " has been already introduced");
                } else {

                    dbfac.insertDocumentDb('urls', urlShortened, function (insReturn) {

                    });
                    dbfac.close();
                    response.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    response.end(JSON.stringify({
                        original_url: urlShortened.original_url,
                        short_url: urlShortened.shortened_url
                    }));
                }


            });

            //dbfac.getItembyName('urls',paramadd);
        });
    } else {
        response.end("The url provided is not in the correct form");
    }

    //console.log('params:'+ request.params[0]);
    //response.end('soon you will know url '+request.params[0]);
});


/**
 * endpoint to redirect(clean console.log)
 */
app.get('/api/short/:id', function (request, response) {
    if (Utilities.CheckNum(request.params.id)) {
        dbfac.connect(app.get('MONGODB'), function () {
            console.log("Connected to MongoDb.\nRunning instance on " + app.get('MONGODB'));
            let paramadd = parseInt(request.params.id);
            dbfac.getItembyId("urls", paramadd, function (returnvalue) {
                //console.log(returnvalue);
                //console.log("SERVER GOT RESPONSE from db:\nurl: "+returnvalue.idUrl+"\npath: "+returnvalue.urlpath);
                dbfac.close();
                if (returnvalue.idUrl < 0) {
                    response.end("The value sent is not registered with the service");
                } else {
                    response.redirect(returnvalue.urlpath);
                }
            });
        });
    } else {
        response.end("The value sent is not numeric, or not in conformity with the requested");
    }

});
//

/**
 * endpoint for the File Metadata Microservice challenge
 */
app.post('/api/files', multer({
    dest: './uploads/'
}).single('upl'), function (request, response) {

    var item = {
        fileName: request.file.originalname,
        filetype: request.file.mimetype,
        FileSize: request.file.size
    };
    fs.unlink('./uploads/' + request.file.filename, function (err) {
        if (err) {
            //console.log("error deleting file"+ item.fileName);
            response.status(500).send("error deleting file" + item.fileName);
        } else {
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(item));
        }
    });



});


/**
 * entry point for the "server"
 */
app.get('*', function (request, response) {
    response.sendFile(__dirname + '/dist/index.html');

});




/**
 * function to set up the listener for the requests
 * 
 */
app.listen(app.get('port'), function (error) {
    if (error) {
        console.log("error freecodecampApi: " + error)
    } else {
        console.info("freecodecamp app is running on port", app.get('port'));


    }
});