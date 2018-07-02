import mongoose from 'mongoose'

// const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = mongoose.Schema({
  username: {type: String, required: true},
  created: {type: Date, default: Date.now},
  numseq: {type: Number, default: 0}
})
// UserSchema.plugin(AutoIncrement,{inc_field:'numseq'});

const UserModel = mongoose.model('user', UserSchema)

UserSchema.pre('save', function(next) {
  if (this.isNew) {
    UserModel.count()
      .then(res => {
        if (res === 0) {
          this.numseq = 1
        } else {
          this.numseq = res += 1
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
export default UserModel
