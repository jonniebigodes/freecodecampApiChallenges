/**
 * module to act in the service capacity
 * outside access like http get /posts
 */
(function(){
    var unirest = require('unirest');
    var async= require('async');    
    module.exports={
        /**
         * function the handle http get request to google with a start index(google cse=custom search engine does not allow more than 10 items per result)
         * @param value the object containing api information and the query itself
         * @param valueIndex the start index for the query
         * @param callback object to be activated when all done or error
         */
        makeGoogleRequestStartIndex:function(value,valueIndex,callback){
            
            var googleResult={status:0,errorInfo:"",results:[]};
            // creates a new request object with the information
            unirest.get(value.searchEngine)
                    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
                    .query({"key":value.keyapi})
                    .query({"cx":value.keysecret})
                    .query({"q":value.escapedQuery})
                    .query({"searchType":"image"})
                    .query({"num":value.numItems})
                    .query({"startIndex":valueIndex})
                    .query({"safe":"off"})
                    .end(function(googleResponse){
                        // check if error and activates the callback
                        if (googleResponse.error){
                            googleResult.status=500;
                            googleResult.errorInfo= googleResponse.error;
                            callback(googleResult);
                           
                        }
                        else{
                            //parses the information obtained and injects it to the object
                            var tmpres=googleResponse.body;
                            googleResult.status=200;
                            for (var i=0;i<tmpres.items.length;i++){
                                var tmpItemresult= {"title":"","linkurl":"","height":0,"width":0,"filesize":0};
                                tmpItemresult.title= tmpres.items[i].title;
                                tmpItemresult.linkurl=tmpres.items[i].link;
                                tmpItemresult.height= parseInt(tmpres.items[i].image.height);
                                tmpItemresult.width= parseInt(tmpres.items[i].image.width);
                                tmpItemresult.filesize= parseInt(tmpres.items[i].image.byteSize);
                                googleResult.results.push(tmpItemresult);
                            }
                            callback(googleResult);
                        }
                    });
                    
        },
        /**
         * function to make a google request single request
         * @param value the object containing the information about the query and google api
         * @param callback the object to be activated when error or all done
         */
        makeGoogleRequest:function(value,callback){
            // defines and instanciates the object containing the response information
            var googleResult={status:0,errorInfo:"",results:[]};
            //
            // creates a new request object with the information provided in the function argument
            unirest.get(value.searchEngine)
                    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
                    .query({"key":value.keyapi})
                    .query({"cx":value.keysecret})
                    .query({"q":value.escapedQuery})
                    .query({"searchType":"image"})
                    .query({"num":value.numItems})
                    .query({"safe":"off"})
                    .end(function(googleResponse){
                        // checks error
                        if (googleResponse.error){
                            googleResult.status=500;
                            googleResult.errorInfo= googleResponse.error;
                            callback(googleResult);
                           
                        }
                        else{
                            var tmpres=googleResponse.body;
                            googleResult.status=200;
                            // iterates the result and injects the result on the object
                            for (var i=0;i<tmpres.items.length;i++){
                                var tmpItemresult= {"title":"","linkurl":"","height":0,"width":0,"filesize":0};
                                tmpItemresult.title= tmpres.items[i].title;
                                tmpItemresult.linkurl=tmpres.items[i].link;
                                tmpItemresult.height= parseInt(tmpres.items[i].image.height);
                                tmpItemresult.width= parseInt(tmpres.items[i].image.width);
                                tmpItemresult.filesize= parseInt(tmpres.items[i].image.byteSize);
                                googleResult.results.push(tmpItemresult);
                            }
                            callback(googleResult);
                            
                        }
                    });
        },
        /**
         * function to handle the single request to the specified endpoint
         * @param value the object containing the information about the request
         * @param callback object to be activated when all done
         */
        makeSingleRequest:function(value,callback){
            switch (value.engineused) {
                case "instagram":
                    break;
                case "twitter":
                    break;
                case "google":
                    module.exports.makeGoogleRequest(value,function(data){
                        callback(data);
                    });
                    break;
                default:
                   
                    
                    break;
            }
            
        },
        /**
         * function to create multiple requests async mode
         * @param value the object containing information for the request
         * @param callback object to be used when all done
         */
        makeMultipleRequests:function(value,callback){
            var startIndex=11;
           
            var multipleQueryresult={status:0,itemsResultMultiple:[]};
           // async array to be used 
            var arrayCalls=[];

            //not pretty but i gonna try it out for use on async pattern
            switch (value.engineused) {
                case "instagram":
                    arrayCalls.push({itemAsync:"instagram",valueSearch:value,startat:startIndex});
                    break;
                case "twitter":
                    arrayCalls.push({itemAsync:"twitter",valueSearch:value,startat:startIndex});
                    break;
                case "google":
                    for(var i=0;i<value.numQueries;i++){
                        if (i===0){
                            arrayCalls.push({itemAsync:"google",valueSearch:value,startat:0});
                        }
                        else{
                            arrayCalls.push({itemAsync:"google",valueSearch:value,startat:startIndex});
                        }
                        startIndex+=10;
                    }
                    break;
                default:
                    
                    break;
            }
            // iterates the async array and calls the functions
            async.each(arrayCalls,function(item,callback){
                
                switch (item.itemAsync) {
                    case "instagram":
                        break;
                    case "twitter":
                        break;
                    case "google":
                        if (item.startat===0){
                            module.exports.makeGoogleRequest(item.valueSearch,function(data){
                                multipleQueryresult.itemsResultMultiple.push(data);
                                callback();
                            });
                        }
                        else{
                            module.exports.makeGoogleRequestStartIndex(item.valueSearch,item.startat,function(data){
                                multipleQueryresult.itemsResultMultiple.push(data);
                                callback();
                            });
                        }
                        break;
                    default:
                        break;
                }
            },function(err){
                multipleQueryresult.status=200;
                
                callback(multipleQueryresult);
            });
           
        },
        /**
         * entry level function for handling the requests to the apis
         * @param value the object containing the information to be handled
         * @param callback object to be activated when all done/error
         */
        GetServerInfo:function(value,callback){
            var result={};
            try {
                // checks if the number queries and acts accordingly
                if (value.numQueries>0){
                    module.exports.makeMultipleRequests(value,function(responsedata){
                        result= responsedata;
                        callback(result);
                    });  
                }
                else{
                    module.exports.makeSingleRequest(value,function(data){
                        result=data;
                        callback(result);
                    });
                }
                 //
                
            } catch (error) {
                console.error("ERROR GETINFO:\n"+error);
            } 
        },     
    }
})();