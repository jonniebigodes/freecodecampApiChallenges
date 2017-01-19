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