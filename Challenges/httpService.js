(function(){
    var unirest = require('unirest');
    var async= require('async');    
    module.exports={
        makeGoogleRequestStartIndex:function(value,valueIndex,callback){
            console.log("ENTERED HERE GOOGLE MULTIPLE items:\n"+ valueIndex);
            var googleResult={status:0,errorInfo:"",results:[]};
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
                        if (googleResponse.error){
                            googleResult.status=500;
                            googleResult.errorInfo= googleResponse.error;
                            callback(googleResult);
                           
                        }
                        else{
                            console.log("multiple makeGoogleRequestStartIndex:\n"+googleResponse.body);
                             //console.log(getresponse.body);
                            var tmpres=googleResponse.body;
                            //var JsonResult= JSON.parse(tmpres);
                            //callback(googleResult);
                            //var tmpresParsed= JSON.parse(tmpres);

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
        makeGoogleRequest:function(value,callback){
            console.log("ENTERED HERE GOOGLE:\n"+ value.escapedQuery+" items:" +value.numItems);
            var googleResult={status:0,errorInfo:"",results:[]};
            unirest.get(value.searchEngine)
                    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
                    .query({"key":value.keyapi})
                    .query({"cx":value.keysecret})
                    .query({"q":value.escapedQuery})
                    .query({"searchType":"image"})
                    .query({"num":value.numItems})
                    .query({"safe":"off"})
                    .end(function(googleResponse){
                        if (googleResponse.error){
                            googleResult.status=500;
                            googleResult.errorInfo= googleResponse.error;
                            callback(googleResult);
                           
                        }
                        else{
                            console.log("SINGLE REQUEST:\n"+googleResponse.body);
                            var tmpres=googleResponse.body;
                            //var JsonResult= JSON.parse(tmpres);
                            //callback(googleResult);
                            //var tmpresParsed= JSON.parse(tmpres);

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
        
        makeMultipleRequests:function(value,callback){
            var startIndex=11;
            var multipleQueryresult={status:0,itemsResultMultiple:[]};
            
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
            async.each(arrayCalls,function(item,callback){
                console.log("item start at:"+ item.startat);
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
                console.log("FINALLY ALL DONE:\n"+multipleQueryresult.itemsResultMultiple.length);
                callback(multipleQueryresult);
            });
           
        },
        
        GetServerInfo:function(value,callback){
            var result={};
            console.log("numQueries: "+value.numQueries);
            try {
                if (value.numQueries>0){
                    //to change
                    //result= {"status":500,"errorInfo":"",results:[]};
                    console.log("GOT MULTIPLE RESULTS CALL");
                    module.exports.makeMultipleRequests(value,function(responsedata){
                        result= responsedata;
                        callback(result);
                    });
                    
                    //
                }
                else{
                    module.exports.makeSingleRequest(value,function(data){
                        result=data;
                        callback(result);
                    });
                }
                
            } catch (error) {
                console.error("ERROR GETINFO:\n"+error);
            }
            
            
        },
       
        
    }
})();