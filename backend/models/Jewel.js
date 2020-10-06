var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var JewelSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  name: String,
  brand: String,
  type: String,
  price: Number,
  favoritesCount: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tagList: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

JewelSchema.plugin(uniqueValidator, { message: 'is already taken' });

JewelSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify();
  }

  next();
});

JewelSchema.methods.slugify = function () {
  this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

JewelSchema.methods.updateFavoriteCount = function () {
  var jewel = this;

  return User.count({ favorites: { $in: [jewel._id] } }).then(function (count) {
    jewel.favoritesCount = count;

    return jewel.save();
  });
};

JewelSchema.methods.toJSONFor = function (user) {
  return {
    slug: this.slug,
    name: this.name,
    brand: this.brand,
    type: this.type,
    price: this.price,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    owner: user ? user.toProfileJSONFor(user) : this.owner.toProfileJSONFor(user)
  
  };
};

mongoose.model('Jewel', JewelSchema);
