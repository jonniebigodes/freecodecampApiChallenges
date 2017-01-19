var headerChallenge= require('./headerChallenge/headerParseModule.js');
var timeCheck= require('./timeCheckChallenge/timeCheckerModule.js');
var urlData= require('./UrlshortChallenge/urlShortenerModule.js');

module.exports={
    CheckNum:function(value){
      return /^\d+$/.test(value);  
    },
    getClientInfo:function(request){
        return headerChallenge.parseMetadataHeader(request);
    },
    getTimeInformation:function(valueTime){
        return timeCheck.getDateInfo(valueTime);
    },
    searchUrl:function(value,valueDb){
        return urlData.searchUrl(value,valueDb);
    },
    ShortenUrl:function(value,valuedb){
        return urlData.createShortUrl(value,valuedb);
    },
    UrlValidate:function(value){
        return urlData.validateUrl(value);
    }
};
