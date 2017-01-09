module.exports={
    checkNumeric:function(value){
      return /^\d+$/.test(value);  
    },
    convertTimestampNatural:function(value){

        var tmpStamp= parseInt(value);
        var datecorrect=new Date(tmpStamp*1000);
        //datecorrect.toUTCString();
        //datecorrect.toLocaleString();
       var formated= datecorrect.toISOString().slice(0,10);
       return formated;
    },
    convertNaturalTimeStamp:function(value){
        var result= parseInt((new Date(value).getTime()/1000).toFixed(0));
        return result;
    },
    isValidDate:function(value){
        let Months=['','','','','','','','','','','',''];
        return false;
        
    },
    getDateInfo:function(dateValue){
        var result={};
        if (module.exports.checkNumeric(dateValue)){
            result.NaturalDate= module.exports.convertTimestampNatural(dateValue);
            result.unixTimeStamp= dateValue;
            
        }
        else if (module.exports.isValidDate(dateValue)){
            result.NaturalDate= dateValue;
            result.unixTimeStamp=11111111;
        }
        else{
            result.NaturalDate=null;
            result.unixTimeStamp= null;
        }
        /*
        if (valueNatural){
            result.unixTimeStamp= module.exports.convertNaturalTimeStamp(valueNatural);
            result.naturalDate=valueNatural;
            return result; 
        }
        if (valueTimeStamp){
            result.NaturalDate= module.exports.convertTimestampNatural(valueTimeStamp);
            result.unixTimeStamp= valueTimeStamp;
            return result;
        }
        */
        return result;
    }

}