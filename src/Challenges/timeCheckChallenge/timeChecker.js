/**
 * module to handle the time challenge logic
 */
import moment from 'moment'

/**
 * function to check if the value is numeric
 * @param value string to be analyzed
 * @returns the evaluation of the string if numeric
 */
const checkNumeric = value => {
  return /^\d+$/.test(value)
}
/**
 * function to convert the timestamp argument to natural date formated
 * @param value in timestamp formated
 * @return formatted date in natural form
 */
const convertTimestampNatural = value => {
  // const stamp = parseInt(value,10);
  const correctdate = new Date(parseInt(value, 10) * 1000)
  return correctdate.toISOString().slice(0, 10)
}
/**
 * function to convert the natural date to timestamp
 * @param value date in natural format to be converted to timestamp
 * @return timestamp format date
 */
const convertNaturalTimeStamp = value => {
  const formatteddate = moment(value, 'DD/MM/YYYY', true)
  return formatteddate.unix()
}
/**
 * function to check if the date is in valid format
 * @param value of the date to be parsed
 * @returns value of the evaluation of the date provided
 */
const isValidDate = value => {
  const result = moment(value, 'DD/MM/YYYY', true)
  if (result.isValid()) {
    return true
  }
  return false
}
const getNaturalDateFormated = value => {
  return value.split(' ').join('-')
}
/**
 * entry level function on the module for handling the logic of the module
 * @param dateValue value provided on the param of the request
 * @return the properly formatted date
 */
const getDateInfo = dateValue => {
  if (checkNumeric(dateValue)) {
    return {
      NaturalDate: convertTimestampNatural(dateValue),
      unixTimeStamp: dateValue
    }
  } else if (isValidDate(dateValue)) {
    return {
      NaturalDate: getNaturalDateFormated(dateValue),
      unixTimeStamp: convertNaturalTimeStamp(dateValue)
    }
  }
  return {NaturalDate: 'Not valid', unixTimeStamp: 'Not valid'}
}

export default getDateInfo
