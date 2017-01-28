/**
 * module to handle the time challenge logic
 */
module.exports={
    /**
     * function to check if the value is numeric
     * @param value string to be analyzed
     * @returns the evaluation of the string if numeric
     */
    checkNumeric:function(value){
      return /^\d+$/.test(value);  
    },
    /**
     * function to convert the timestamp argument to natural date formated
     * @param value in timestamp formated
     * @return formatted date in natural form
     */
    convertTimestampNatural:function(value){

        var tmpStamp= parseInt(value);
        var datecorrect=new Date(tmpStamp*1000);
        
       var formated= datecorrect.toISOString().slice(0,10);
       return formated;
    },
    /**
     * function to convert the natural date to timestamp
     * @param value date in natural format to be converted to timestamp
     * @return timestamp format date
     */
    convertNaturalTimeStamp:function(value){
        let result= parseInt((new Date(value).getTime()/1000).toFixed(0));
        return result;
    },
    /**
     * function to check if the date is in valid format
     * @param value of the date to be parsed
     * @returns value of the evaluation of the date provided
     */
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
    /**
     * entry level function on the module for handling the logic of the module
     * @param dateValue value provided on the param of the request
     * @return the properly formatted date
     */
    getDateInfo:function(dateValue){
        var result={};
        // checks if the date is numeric format and is valid date and acts processes it
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
       //
        return result;
    }

}