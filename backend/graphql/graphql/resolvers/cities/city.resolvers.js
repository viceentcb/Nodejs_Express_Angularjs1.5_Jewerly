const mongoose = require('mongoose');
const City = mongoose.model('City');
const Shop = mongoose.model('Shop');


const resolvers = {

    Query: {
        city: (root, { slug }) => {
            return City.findOne({ slug: slug }).exec();
        },
        cities: () => {
            return City.find().exec();
        },
    },

    Mutation: {
        createCity: async (root, { input }) => {
            let city = new City(input);
            await city.save();
            return city;


        },
        updateShopinCity: async (root, { input }) => {
            let city = await getcityid(input.name)
            let id_city = city.id
            let shopsincity = city.shop
            let ids_shops = await getshopsid(input.shop)

            await final_shops(shopsincity, input.shop)


        }
    },
    City: {
        shop: async (parent) => {
            let shops = []
            for (let i = 0; i < parent.shop.length; i++) {
                shops.push(await Shop.findOne({ _id: parent.shop[i] }).exec())
            }
            return shops

        }
    }
};

let getcityid = async (name) => {
    return await City.findOne({ name: name }, { _id: 1, shop: 1 }).exec()
}

let getshopsid = async (name) => {
    let shops = []
    for (let i = 0; i < name.length; i++) {
        shops.push(await Shop.findOne({ name: name[i] }, { _id: 1 }).exec())
    }
    return shops
}

let final_shops = async (shopsincity, insertshops) => {
    console.log("-------------")
    console.log(shopsincity)
    console.log(insertshops)

    let id;

    for (let i = 0; i < insertshops.length; i++) {

        id=await Shop.findOne({ name: insertshops[i] },{_id:1}).exec()

        insertshops.push(id._id)
    }
    console.log(insertshops)

}
    module.exports = resolvers;