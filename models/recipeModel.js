const mongoose = require('mongoose')

var recipeSchema = new mongoose.Schema({
  name: String,
  content: String,
  meta: {
    createAt: {type: Date, default: Date.now()},
    updateAt: {type: Date, default: Date.now()},
  }
})
recipeSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.updateAt = this.meta.createAt = Date.now()
  } else
  {
    this.meta.updateAt = Date.now()
  }
  next()
})

recipeSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort({'meta.updateAt': -1})
      .exec(cb)
  },
  fetchById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

var Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
