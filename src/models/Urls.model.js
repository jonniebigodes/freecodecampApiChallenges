import mongoose from 'mongoose'

const URLSchema = mongoose.Schema({
  urlid: {type: Number, required: true},
  urllink: {type: String, required: true}
})

const UrlModel = mongoose.model('url', URLSchema)

export default UrlModel
