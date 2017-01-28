/**
 * module to handle the logic behind the image search challenge
 */
(function(){
    // class constants
    const googleendPoint="https://www.googleapis.com/customsearch/v1?";
    const twitterendPoint="https://search.twitter.com/search.json";
    const instagramendPoint="";
    //
    // sanitized query to google/instagram/twitter
    var result= {engineused:"",searchEngine:"",numItems:0,keyapi:"",keysecret:"",numQueries:0,escapedQuery:"",apitwitterencoded:""};
    //

    var queryescape= require('querystring');
    module.exports={
        /**function to redirect the and sanitize the information on the request
         * @param valueParams object containing the information on the request
         * @returns sanitized object
         */
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
        /**
         * function to handle the construction of the object for making a google image request
         * @param object containing the information of the request
         * @return object properly formatted for making a google request
         */
        searchGoogleImages:function(valueParams){
            //assings property values
            result.searchEngine= googleendPoint;
            result.keyapi=valueParams.googleApiKey;
            result.keysecret= valueParams.googleApiCx;
            result.engineused="google";
            
            result.escapedQuery= queryescape.stringify({query:valueParams.wordsSearch});
            //
            // checks the offset and sets the value of queries accordingly
            if (valueParams.Queryoffset>10){
                result.numItems=10;
                result.numQueries= parseInt(valueParams.Queryoffset/10);
                
            }
            else{
                result.numItems=valueParams.Queryoffset;
                
            }
            //
            
            return result;
        },
        /**
         * function to handle the sanitize and construction of query sent to twitterBase64Info
         * @param object containing information in the request
         * @return object properly formatted for twitter requesting
         */
        searchTwitter:function(valueParams){ 
            
            result.searchEngine="twitter";
            result.escapedQuery= queryescape.stringify({query:valueParams.wordsSearch});
            result.numItems= valueParams.Queryoffset;
            result.apitwitterencoded= convertToBase64(valueParams.apiTwitterConsumerKey+":"+valueParams.apiTwitterConsumerSecret);
            return result;
        },
        /**
         * function to handle the conversion of a string to base64
         * @param value the string to be converted
         * @return base64 encoded string
         */
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