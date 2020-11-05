var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var CitySchema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    name: String,
    shop:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }]
}, { timestamps: true,
    usePushEach: true
});



    CitySchema.plugin(uniqueValidator, { message: 'is already taken' });

    CitySchema.pre('validate', function (next) {
        if (!this.slug) {
            this.slugify();
        }

        next();
    });

    CitySchema.methods.slugify = function () {
        this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);

        console.log(this.slug)
    };


CitySchema.methods.toJSONFor = function () {
    return {
        _id: this._id,
        slug: this.slug,
        name: this.name,
        shop: this.shop
    };
};

mongoose.model('City', CitySchema);
