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
        let result= parseInt((new Date(value).getTime()/1000).toFixed(0));
        return result;
    },
    isValidDate:function(value){
        
        let tmpData= new Date(value);
        
        //console.log(tmpData.getMonth());
        if (isNaN(tmpData)){
            return false;
        }
        return true;
        
    },
    getNaturalDateFormated:function(value){
        
        
        let tmpItem= value.split(' ').join("-");
        return tmpItem;
    },
    getDateInfo:function(dateValue){
        var result={};
        if (module.exports.checkNumeric(dateValue)){
            result.NaturalDate= module.exports.convertTimestampNatural(dateValue);
            result.unixTimeStamp= dateValue;
            
        }
        else if (module.exports.isValidDate(dateValue)){
            
            result.NaturalDate= module.exports.getNaturalDateFormated(dateValue);
            result.unixTimeStamp=module.exports.convertNaturalTimeStamp(dateValue);
            
        }
        else{
            result.NaturalDate="null";
            result.unixTimeStamp= "null";
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
        //console.log("natural date:\n"+ result.NaturalDate+" unixTimeStamp:\n"+ result.unixTimeStamp);
        return result;
    }

}