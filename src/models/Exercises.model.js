import mongoose from 'mongoose'

const ExerciseSchema = mongoose.Schema({
  user: {type: Number, required: true},
  exercisedescription: {type: String, required: true},
  exerciseduration: {type: Number, required: true},
  created: {type: Date, default: Date.now}
})
const ExerciseModel = mongoose.model('exercise', ExerciseSchema)
export default ExerciseModel
