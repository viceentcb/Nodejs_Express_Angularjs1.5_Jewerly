var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  jewel: { type: mongoose.Schema.Types.ObjectId, ref: 'Jewel' },
}, {timestamps: true});

// Requires population of author
CommentSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    author: this.author.toProfileJSONFor(user)
  };
};

// JewelSchema.methods.updateFavoriteCount = function () {
//   var jewel = this;

//   return User.count({ favorites: { $in: [jewel._id] } }).then(function (count) {

//     jewel.favoritesCount = count;

//     return jewel.save();
//   });
// };


const Comment = mongoose.model('Comment', CommentSchema)

mongoose.model('Comment', CommentSchema);
