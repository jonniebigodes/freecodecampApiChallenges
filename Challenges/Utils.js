var headerChallenge= require('./headerChallenge/headerParseModule.js');
var timeCheck= require('./timeCheckChallenge/timeCheckerModule.js');
module.exports={
    getClientInfo:function(request){
        return headerChallenge.parseMetadataHeader(request);
    },
    getTimeInformation:function(valueTime){
        return timeCheck.getDateInfo(valueTime);
    }
};
