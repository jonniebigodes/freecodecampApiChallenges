var headerChallenge= require('./headerChallenge/headerParseModule.js');

module.exports={
    getClientInfo:function(request){
        return headerChallenge.parseMetadataHeader(request);
    }
};
