/**
 * module created to act as like the controller in the mvc pattern
 */


// imports the modules
var headerChallenge= require('./headerChallenge/headerParseModule.js');
var timeCheck= require('./timeCheckChallenge/timeCheckerModule.js');
var urlData= require('./UrlshortChallenge/urlShortenerModule.js');
var imgGet= require('./imageSearch/imgSearchModule.js');
//
module.exports={
    /**
     * function to check if its num
     * @param value to be test
     */
    CheckNum:function(value){
      return /^\d+$/.test(value);  
    },
    /**
     * function to call the function on the module to get the request information
     * @param request value containing the request object
     * @return the information parsed accordingly
     */
    getClientInfo:function(request){
        return headerChallenge.parseMetadataHeader(request);
    },
    /**
     * function to process the information for that challenge
     * @param valueTime the date information
     * @return the result of the module processing information
     */
    getTimeInformation:function(valueTime){
        return timeCheck.getDateInfo(valueTime);
    },
    /**
     * function to invoke the module and act accordingly
     * @param value the url
     * @param valueDb the array containing the db information
     * @return the result of the call of the method
     */
    searchUrl:function(value,valueDb){
        return urlData.searchUrl(value,valueDb);
    },
    /**
     * function to call the module to process the shortening of the url
     * @param value the request information
     * @param valuedb the information obtained from the db search results
     * @return the result of the processing
     */
    ShortenUrl:function(value,valuedb){
        return urlData.createShortUrl(value,valuedb);
    },
    /**
     * function to call the module to process the url validation
     * @param value the item to be checked
     * @return the valid url
     */
    UrlValidate:function(value){
        return urlData.validateUrl(value);
    },
    /**
     * function to return the image search information sanitized
     * @param value the information obtained from the request
     * @return the sanitized information to be passed onto the service
     */
    imagesSearch:function(value){
        return imgGet.searchImages(value);

        
    }
};
