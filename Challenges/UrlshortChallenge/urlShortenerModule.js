module.exports={
    validateUrl:function(url){
        var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        return regex.test(url);
    },
    createShortUrl:function(value,dbObject){
        
        let result={shortId:0,original_url:"NOK",shortened_url:""};
        

        if (module.exports.searchUrl(value,dbObject)){
            return result;
        }
        let randomId=module.exports.randomizeNumber();
        while(module.exports.searchId(randomId,dbObject)){
            randomId=module.exports.randomizeNumber();
        }

        result.original_url=value;
        result.shortened_url="https://freecodecampapichallenges.herokuapp.com/api/short/"+randomId;//change to heroku
        result.shortId=randomId;
        return result;

    },
    searchId:function(value,dbObject){

        for (var i=0;i<dbObject.length;i++){
            if (value===dbObject[i].idUrl){
                return true;
            }
        }
        return false;
        
    },
    searchUrl:function(value,dbObject){
        let result= dbObject.find((item)=>item.urlpath.toLowerCase()===value.toLowerCase());
        if (result){
            return true;
        }
        return false;
        
        
    },
    randomizeNumber:function(){
        let result=Math.floor(Math.random()*(999999-1+1)+1);
        return result;

    }
}
