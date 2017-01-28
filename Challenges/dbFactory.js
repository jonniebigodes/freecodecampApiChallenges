//to be refactored into proper factory pattern
/**
 * module to handle the db logc for the challenges
 */

(function(){
    // variables to contain the information of the import and the dbobject instance
    var client= require('mongodb').MongoClient,mongoInstance;
    

    module.exports={
        /**
         * function to connect to the mongo db instance
         * @param dburl connection string
         * @param callback callback to be activated whenn the connection is done/error
         */
        connect:function(dbUrl,callback){
            client.connect(dbUrl,function(err,db){
                mongoInstance= db;
                if (callback){return callback();}
            });
        },
        /**
         * getter function for the object containing db instance
         */
        getInstance:function(){
            return mongoInstance;
        },
        /**
         * function to cloose the the connection to the db
         */
        close:function(){
            mongoInstance.close();
        },
        /**
         * function to get all the information from the collection that stores the searches made by the user
         * @param dburl collection name
         * @param callback object to be called when the processing is done
         */
        getAllSearches:function(dbUrl,callback){
            try {
                //invokes the function to get the db instance object and invokes the mongodb find 
                module.exports.getInstance().collection(dbUrl).find().toArray(function(err,data){
                    //checks if error
                    if (err){
                        console.log("ERROR getAllSearches:\n"+err);
                        throw err;
                    }
                    //
                    //checks if theres data processes it and activates callback
                    if(data){
                        var results=[];
                        for (var i=0;i<data.length;i++){
                            results.push({SearchKeyWords:data[i].searchwords,searchoffset:data[i].numresults});
                        }
                        callback(results);
                    }
                });
                //
            } catch (error) {
                throw err;
            }
        },
        /**
         * function to handle the image search information storage.
         * call it a "cache"
         * @param dburl the collection to be changed
         * @param valueRequest the information to be stored
         * @param callback the object to be called when error/all done
         */
        insertDbSearch:function(dbUrl,valueRequest,callback){
            try {
                var lastItem=0;
                //invokes the getter method and gets and calls framework object to get the information
                module.exports.getInstance().collection(dbUrl).find().toArray(function(err,data){
                    if (err){
                        console.log("ERROR getAllSearches:\n"+err);
                        callback(err,null);
                        return;
                    }
                    if(data){
                        
                        for (var i=0;i<data.length;i++){
                            lastItem++;
                        }
                        
                    }
                    // again invokes the getter to make the changes on the collection 
                    module.exports.getInstance().collection(dbUrl).insert({
                        searchid:lastItem,
                        searchwords:valueRequest.wordsSearch,
                        numresults:valueRequest.Queryoffset
                    },function(err,data){
                        if(err){
                            throw err;
                            callback(err,null);
                            return;
                        }
                        callback(null,lastItem);
                    });
                });
            } catch (error) {
                throw err;
            }
        },
        /**
         * function to handle the information returned from the search made by the user
         * @param dburl collection to be changed
         * @param valueItemQueries value of number of queries(requests made)
         * @param valueSearchResults the object containing the search results
         * @param the corresponding id of the search on the other collection
         * @param callback the object to be activated when all done or error
         */
        insertSearchResults:function(dburl,valueItemQueries,valueSearchResults,valueInsertSearch,callback){
            try {


                var itemsInsert=[];
                // checks the number of queries(if it was a single request or multiple ones)
                if (valueItemQueries===0){
                    //injects the array with the information sanitized accordingly
                   for (var i=0;i<valueSearchResults.results.length;i++){
                       itemsInsert.push({
                           idsearch:valueInsertSearch,
                           titleimage:valueSearchResults.results[i].title,
                           urllink:valueSearchResults.results[i].linkurl,
                           height:valueSearchResults.results[i].height,
                           width:valueSearchResults.results[i].width,
                           filesize:valueSearchResults.results[i].filesize
                        });
                   }
                   //
                }
                else{
                    //multiple requests iterate the results objects arrays to get the information and inject it on the array
                    for (var x=0;x<valueSearchResults.itemsResultMultiple.length;x++){
                        for (var k=0;k<valueSearchResults.itemsResultMultiple[x].results.length;k++){
                            itemsInsert.push({
                                idsearch:valueInsertSearch,
                                titleimage:valueSearchResults.itemsResultMultiple[x].results[k].title,
                                urllink:valueSearchResults.itemsResultMultiple[x].results[k].linkurl,
                                height:valueSearchResults.itemsResultMultiple[x].results[k].height,
                                width:valueSearchResults.itemsResultMultiple[x].results[k].width,
                                filesize:valueSearchResults.itemsResultMultiple[x].results[k].filesize
                            });
                        }
                    }
                }
                //invokes the getter method to get the db object and injects the data onto the collection
                module.exports.getInstance().collection(dburl).insertMany(itemsInsert,function(err,data){
                    if (err){
                        callback(err,null);
                        return;
                    }
                    callback(null,"DONE");

                });
                
            } catch (error) {
                console.log("ERROR INSERTING SEARCH RESULTS:\n"+ error);
            }
        },
        /**
         * function to check if the search already exists in the "cache"(db)
         * @param valueCollection the collection to be processed
         * @param valueSearch object containing the search made by the user
         * @param callback object to be activated when the works is done
         */
        getSearchQueryByName:function(valueCollection,valueSearch,callback){
            //calls the getter funciton to the get the db instance object and makes a filtered(projected) search
            //and checks if there's data
            module.exports.getInstance().collection(valueCollection).findOne({
              searchwords:valueSearch.wordsSearch,
              numresults:valueSearch.Queryoffset  
            },{_id:0,searchwords:0,numresults:0},function(err,data){
                if(err){
                    callback(err,null);
                    return;
                }
                if (data){
                    
                    callback(null,data.searchid);
                }
                else{
                    callback(null,-1);
                }
            });
        },
        /**
         * function to get the cached version of the search results if there data
         * yeah the knowledge is limited on mongo so i took a relational approach on the db construction
         * @param valueCollection collection to be processed
         * @param valueQuery the value containing corresponding id of the search stored
         * @param callback item to be activated when all done or error
         */
        getSearchResultsByID:function(valueCollection,valueQuery,callback){
            try{
                //invokes the getter function and makes a filtered(projected)
                //search on the db instance object based on the information provided
                module.exports.getInstance().collection(valueCollection).find({idsearch:valueQuery},{_id:0}).toArray(function(err,data){
                    //checks error and activates callback
                    if(err){
                        callback(err,null);
                        return;
                    }
                    //checks if there's data and sanitizes it for result
                    if (data){
                        var resultquery={status:200,errorInfo:"",results:[]};
                        for (var i=0;i<data.length;i++){
                            resultquery.results.push({
                                title:data[i].titleimage,
                                linkurl:data[i].urllink,
                                height:data[i].height,
                                width:data[i].width,
                                filesize:data[i].filesize
                            });
                        }
                        console.log("getSearchResultsByID got "+ resultquery.results.length);
                        callback(null,resultquery);
                    }
                });
            }
            catch(err){
                throw err;

            }
        },
        /**
         * function to get all the document information for the shortener challenges
         * @param valueCollection name of the collection to the processed
         * @param callback object to be activated when error or all done
         */
        getAllDocuments:function(valueCollection,callback){
            let result=[];
            
            try{
                // invokes the getter function to get the db object instance and make a search on the collection 
                let item= module.exports.getInstance().collection(valueCollection).find().toArray(function(err,data){
                    //checks if error
                    if (err){
                        console.log("error gettin all documents:\n"+err);
                        throw err;
                    }
                    //
                    // checks if there's data and format it 
                    if (data){
                        for (var i=0;i<data.length;i++){
                            let item={idUrl:data[i].urlid,urlpath:data[i].urllink};
                            result.push(item);
                       }
                       
                    }
                    callback(result);
                });
                


            }
           catch(err){
               throw err;
           }
           
        },
        /**
         * function to check if the provided id is in the db already
         * @param valueCollection collection to be processed
         * @param valueItem item to be searched
         * @param callback object to be activated if there's data or error
         */
        getItembyId:function(valueCollection,valueItem,callback){
            let result={idUrl:-1,urlpath:""};
            try{
                //invokes the getter function to get the db instance and makes the search on the collection
                let item=module.exports.getInstance().collection(valueCollection).findOne({urlid:valueItem},function(err,data){
                    //checks if error
                    if (err){
                        console.log("ERROR on get item by id:\n"+err);
                        throw err;
                    }
                    //checks if data
                    if (data){
                        result.idUrl=valueItem;
                        result.urlpath=data.urllink;
                        //console.log("item got:\nID: "+data.urlid+" link:"+data.urllink+"\n result id"+ result.idUrl+" result path:"+result.urlpath);
                        callback(result);
                    }
                    else{
                        callback(result);
                    }
                    
                });
            }
            catch(err){
                throw err;
            }
            
        },
        /**
         * function to check if the provided id is in the db already
         * @param valueCollection collection to be processed
         * @param valueItem item to be searched
         * @param callback object to be activated if there's data or error
         */
        getItembyName:function(valueCollection,valueItem){
            let result={idUrl:"NOK",urlpath:""};
            try{
                 let item=module.exports.getInstance().collection(valueCollection).findOne({urlpath:valueItem},function (err,item){
                    if (err){
                        throw err;
                    }
                    result.idUrl= item.urlid;
                    result.urlpath=item.urllink;

                });

            }
            catch(err){
                throw err;
            }
            return result;
        },
        /**
         * function to insert the url in the collection
         * @param valueCollection collection to be processed
         * @param valueItem item to be searched
         *no call back cause i suffered the first callback hell in here..so i took a fire and forget approach
         */
        insertDocumentDb:function(valueCollection,valueItem){
            try{
                // invokes the getter function to get the db object instace and changes the collection
                let item=module.exports.getInstance().collection(valueCollection).save({urlid:valueItem.shortId,urllink:valueItem.original_url},function(err,dados){
                    if(err){
                        throw err;
                    }
                    return valueItem.shortId;

                });
            }
            catch(err){
                throw err;
            }
        }

    }
})();