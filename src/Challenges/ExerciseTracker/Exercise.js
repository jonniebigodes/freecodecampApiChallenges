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
 * function to check if the date is in valid format
 * @param value of the date to be parsed
 * @returns value of the evaluation of the date provided
 */
const isValidDate = value => {
  const result = moment(value, 'YYYY-MM-DD', true)
  return result.isValid()
}
const formatDate = value => {
  return moment(value, 'YYYY-MM-DD', true).toDate()
}
const ExerciseBuild = value => {
  if (
    value.from &&
    isValidDate(value.from) &&
    (value.to && isValidDate(value.to))
  ) {
    return {
      $and: [
        {
          user: parseInt(value.user, 10)
        },
        {
          created: {
            $lt: formatDate(value.to),
            $gt: formatDate(value.from)
          }
        }
      ]
    }
  }
  return {
    user: parseInt(value.user, 10)
  }
}
export const ExerciseChecks = {
  isValidDate,
  checkNumeric,
  formatDate,
  ExerciseBuild
}
