import mongoose from 'mongoose'

const SearchResultsSchema = mongoose.Schema({
  idsearch: {type: Number, default: 0},
  titleimage: {type: String, default: ''},
  urllink: {type: String, default: 0},
  height: {type: Number, default: 0},
  width: {type: Number, default: 0},
  filesize: {type: Number, default: 0},
  thumbnailHeight: {type: Number, default: 0},
  thumbnailWidth: {type: Number, default: 0}
})
const SearchResultsModel = mongoose.model('searchresult', SearchResultsSchema)

export default SearchResultsModel
