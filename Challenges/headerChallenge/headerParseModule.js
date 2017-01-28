/**
 * module to handle the logic behind the header parser challenge
 */
module.exports={
    /**function to parse the information from the header as recieved by the request
     * @param request request object provided
     * @returns object containing the os and ip address and client language
     */
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
        //get the os version and language and returns the information
        var osversion=module.exports.parseosInformation(request);
        var lang=module.exports.parseLanguageInformation(request);
        return {ipAddress : ip,clientLanguage:lang,clientOS:osversion};
        // 
    },
    /**
     * function to parse the information contained on the header
     * @param request object 
     * @returns the language of the client
     */
    parseLanguageInformation: function(request){
        var lang= request.headers['accept-language'].split(',')[0];

        //console.log("osINFO:\n"+ lang);
        return lang;
        
        
    },
    /**
     * function to parse the information about the the os
     * @param request the request object
     * @return the parsed information from the argument
     */
    parseosInformation:function(request){
        var data= request.headers['user-agent'];
        var result= {}
        //console.log("USER AGENT:\n"+ data);
        if (/mobile/i.test(data)){
             result.Mobile = true;
        }
            
        //checks the os information from the argument
        // if windows osx mobile
        if (/like Mac OS X/.test(data)) {
           result.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(data)[2].replace(/_/g, '.');
           result.iPhone = /iPhone/.test(data);
           result.iPad = /iPad/.test(data);
        }

        if (/Android/.test(data))
            result.Android = /Android ([0-9\.]+)[\);]/.exec(data)[1];

        if (/webOS\//.test(data)){
            result.webOS = /webOS\/([0-9\.]+)[\);]/.exec(data)[1];
        }
            

        if (/(Intel|PPC) Mac OS X/.test(data)){
            data.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(data)[2].replace(/_/g, '.') || true;
        }
            

        if (/Windows NT/.test(data)){
            result.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(data)[1];
        }
        //
        //console.log("result:\n"+ JSON.stringify(result));
        //return "nah nah nah";
        return result;
    }
    
}
