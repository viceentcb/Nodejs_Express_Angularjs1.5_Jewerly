const mongoose = require('mongoose');
const Shop = mongoose.model('Shop');
const City = mongoose.model('City');


const resolvers = {

    Query: {
        shop: (root, {slug}) => {
            return Shop.findOne({slug: slug}).exec();
          },
        shops: () => {
            return Shop.find().exec();
        }
    },

    Mutation: {
        createShop: (root, {input}) => {
            const shop = new Shop(input);
    
            // no .exec();
            shop.save();
            return shop;
        }
    },
    Shop: {
        city: async (parent) => {
            let cities = []
            for (let i = 0; i < parent.city.length; i++) {
                cities.push(await City.findOne({ _id: parent.city[i] }).exec())
            }
            return cities

        }
    }
};

module.exports = resolvers;