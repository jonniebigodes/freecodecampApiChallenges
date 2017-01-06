
module.exports={
    parseMetadataHeader:function (request){
         var ip;
         if (request.headers['x-forwarded-for']){
             ip=request.headers['x-forwarded-for'].split(",")[0];
         }
         else if(request.connection && request.connection.remoteAddress){
             ip= request.connection.remoteAddress;
         }
         else{
             ip= request.ip;
         }
         //console.log("ip address is :\n"+ ip);
        //var osversion=parseOsInformation(request);
        var osversion=" soon";
        var lang="to be determined";
        return {ipAddress : ip,clientLanguage:lang,clientOS:osversion}; 
    },
    parseOsInformation: function(request){
        var lang=request.headers['accept-language'];
        console.log("osINFO:\n"+ lang);
        var osversion="";
    }
}
/*
module.exports= function parseMetadataHeader(request){

    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;  
     var lang=request.headers['accept-language'];
     var osversion="";
     return {ipAddress : ip,clientLanguage:lang,clientOS:osversion}; 
}
*/