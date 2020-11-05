var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var ShopSchema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    name: String,
    brand: String,
    city: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }]
}, { timestamps: true });



ShopSchema.plugin(uniqueValidator, { message: 'is already taken' });

ShopSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }

    next();
});

ShopSchema.methods.slugify = function () {
    this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};


ShopSchema.methods.toJSONFor = function () {
    return {
        _id: this._id,
        slug: this.slug,
        name: this.name,
        brand: this.brand,
        city: this.city
    };
};

mongoose.model('Shop', ShopSchema);
