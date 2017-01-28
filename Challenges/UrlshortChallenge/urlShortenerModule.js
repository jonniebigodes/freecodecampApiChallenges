/**
 * module to handle the urlshortener challenge
 */
module.exports={
    /**
     * function to validate the url provided in the argument to be shortened
     * @param url the string containing the url to be analized
     * @return the result of the test if the url is valid
     */
    validateUrl:function(url){
        var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        return regex.test(url);
    },
    /**
     * function to create the short version of the url
     * @param value the url to be checked if is inserted
     * @param dbObject array containing the shortened urls already created
     * 
     * @return the properly shortened url 
     */
    createShortUrl:function(value,dbObject){
        // creates result object
        let result={shortId:0,original_url:"NOK",shortened_url:""};

        //checks if the object is already created
        if (module.exports.searchUrl(value,dbObject)){
            return result;
        }
        // genereates a random number and sees if it's already assigned
        let randomId=module.exports.randomizeNumber();
        while(module.exports.searchId(randomId,dbObject)){
            randomId=module.exports.randomizeNumber();
        }
        //
        // adds the rest of the information to the result object
        result.original_url=value;
        result.shortened_url="https://freecodecampapichallenges.herokuapp.com/api/short/"+randomId;//change to heroku
        result.shortId=randomId;
        return result;

    },
    /**
     * function to check if the random id is already assigned
     * @param value number created to be checked
     * @param dbObject array containing all the objects already created
     * (i know it's not actually a good policy but not gonna implement some better efficient way to handle this like localstorage or something like that
     * just because the scope of the app is rather small )
     * @return the result of the check in the array
     */
    searchId:function(value,dbObject){
        //iterates the array and checks if the arguement is already there
        for (var i=0;i<dbObject.length;i++){
            if (value===dbObject[i].idUrl){
                return true;
            }
        }
        //
        return false;
        
    },
    /**
     * function to check if the object already exists in the array (es6 style for all them fanboys)
     * @param value string containing the url to be checked
     * @param dbObject array containing the latest search results of all the urls on the db
     */
    searchUrl:function(value,dbObject){
        // defines and instantiate the variable to contain the search in the array (es6 style righty ohhh!!!)
        let result= dbObject.find((item)=>item.urlpath.toLowerCase()===value.toLowerCase());
        if (result){
            return true;
        }
        return false;
        
        
    },
    /**
     * function to randomize a number between 1 and that many ammount of 9's
     */
    randomizeNumber:function(){
        //generates a number and returns it
        let result=Math.floor(Math.random()*(999999-1+1)+1);
        return result;
        //

    }
}
