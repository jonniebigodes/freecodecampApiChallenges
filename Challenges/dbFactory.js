//to be refactored into proper factory pattern

(function(){
    var client= require('mongodb').MongoClient,mongoInstance;
    

    module.exports={
        connect:function(dbUrl,callback){
            client.connect(dbUrl,function(err,db){
                mongoInstance= db;
                if (callback){return callback();}
            });
        },
        getInstance:function(){
            return mongoInstance;
        },
        close:function(){
            mongoInstance.close();
        },
        getAllSearches:function(dbUrl,callback){
            try {
                
                module.exports.getInstance().collection(dbUrl).find().toArray(function(err,data){
                    if (err){
                        console.log("ERROR getAllSearches:\n"+err);
                        throw err;
                    }
                    if(data){
                        var results=[];
                        for (var i=0;i<data.length;i++){
                            results.push({SearchKeyWords:data[i].searchwords,searchoffset:data[i].numresults});
                        }
                        callback(results);
                    }
                });
            } catch (error) {
                throw err;
            }
        },
        insertDbSearch:function(dbUrl,valueRequest,callback){
            try {
                var lastItem=0;
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
        insertSearchResults:function(dburl,valueItemQueries,valueSearchResults,valueInsertSearch,callback){
            try {


                var itemsInsert=[];
                
                if (valueItemQueries===0){
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
                }
                else{
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
        getSearchQueryByName:function(valueCollection,valueSearch,callback){
            module.exports.getInstance().collection(valueCollection).findOne({
              searchwords:valueSearch.wordsSearch,
              numresults:valueSearch.Queryoffset  
            },{_id:0,searchwords:0,numresults:0},function(err,data){
                if(err){
                    callback(err,null);
                    return;
                }
                if (data){
                    console.log("got data getSearchQueryByName"+data.searchid);
                    callback(null,data.searchid);
                }
                else{
                    callback(null,-1);
                }
            });
        },
        getSearchResultsByID:function(valueCollection,valueQuery,callback){
            try{
                
                module.exports.getInstance().collection(valueCollection).find({idsearch:valueQuery},{_id:0}).toArray(function(err,data){
                    if(err){
                        callback(err,null);
                        return;
                    }
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
        getAllDocuments:function(valueCollection,callback){
            let result=[];
            
            try{

                let item= module.exports.getInstance().collection(valueCollection).find().toArray(function(err,data){
                    if (err){
                        console.log("error gettin all documents:\n"+err);
                        throw err;
                    }
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
        getItembyId:function(valueCollection,valueItem,callback){
            let result={idUrl:-1,urlpath:""};
            try{

                let item=module.exports.getInstance().collection(valueCollection).findOne({urlid:valueItem},function(err,data){
                    if (err){
                        console.log("ERROR on get item by id:\n"+err);
                        throw err;
                    }
                    
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
        insertDocumentDb:function(valueCollection,valueItem){
            try{
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