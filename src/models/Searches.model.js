import mongoose from 'mongoose'

const SearchSchema = mongoose.Schema({
  searchid: {type: Number, default: 0},
  searchwords: {type: String, required: true},
  numresults: {type: Number, required: true}
})

const SearchModel = mongoose.model('search', SearchSchema)

SearchSchema.pre('save', function(next) {
  if (this.isNew) {
    SearchModel.count()
      .then(res => {
        if (res === 0) {
          this.searchid = 1
        } else {
          this.searchid = res += 1
        }
        next()
      })
      .catch(err => {
        next(err)
      })
  } else {
    next()
  }
})
export default SearchModel
