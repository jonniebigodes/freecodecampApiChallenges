(function(){
    
    const googleendPoint="https://www.googleapis.com/customsearch/v1?";
    const twitterendPoint="https://search.twitter.com/search.json";
    const instagramendPoint="";
    var result= {engineused:"",searchEngine:"",numItems:0,keyapi:"",keysecret:"",numQueries:0,escapedQuery:"",apitwitterencoded:""};
    var queryescape= require('querystring');
    module.exports={
        searchImages:function(valueParams){
            var result={};
            switch (valueParams.engineused) {
                case "insta":
                   result= module.exports.searchInstagram(valueParams);
                    break;
                case "twitter":
                    result= module.exports.searchTwitter(valueParams);
                    break;
                case "all":
                    break;
                case "google":
                    result= module.exports.searchGoogleImages(valueParams);
                    break;
                default:
                    
                    break;
            }
            return result;
           
        },
        searchInstagram:function(valueParams){
            var result={searchEngine:""};
            result.searchEngine="NOT";
            return result;
        },
        searchGoogleImages:function(valueParams){
            //var result= {engineused:"",searchEngine:"",numItems:0,keyapi:"",keysecret:"",numQueries:0,escapedQuery:""};
            result.searchEngine= googleendPoint;
            result.keyapi=valueParams.googleApiKey;
            result.keysecret= valueParams.googleApiCx;
            result.engineused="google";
            //console.log("WORDS SEARCH: "+valueParams.wordsSearch);
            result.escapedQuery= queryescape.stringify({query:valueParams.wordsSearch});
            //console.log("WORDS SEARCH: "+result.escapedQuery);
            if (valueParams.Queryoffset>10){
                result.numItems=10;
                result.numQueries= parseInt(valueParams.Queryoffset/10);
                
            }
            else{
                result.numItems=valueParams.Queryoffset;
                
            }
            console.log("SANITIZE NUM QUERIES: "+ result.numQueries);
            return result;
        },
        searchTwitter:function(valueParams){ 
            //var result= {engineused:"",searchEngine:"",numItems:0,keyapi:"",keysecret:"",numQueries:0,escapedQuery:""};
            result.searchEngine="twitter";
            result.escapedQuery= queryescape.stringify({query:valueParams.wordsSearch});
            result.numItems= valueParams.Queryoffset;
            result.apitwitterencoded= convertToBase64(valueParams.apiTwitterConsumerKey+":"+valueParams.apiTwitterConsumerSecret);
            return result;
        },
        convertToBase64:function(value){
            try {
                var tmpBuffer= new Buffer(value);

                twitterBase64Info= tmpBuffer.toString('base64');
                console.log(twitterBase64Info);
            } catch (error) {
                console.log("Erro ConvertToBase64:\n"+error);
            }
            return twitterBase64Info;
        },
    }

})();