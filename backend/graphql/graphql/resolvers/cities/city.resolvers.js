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

            //Obtenemos la ciudad que vamos a modificar con sus respectivas tiendas
            let city = await City.findOne({ name: input.name })
                .populate('shop')
                .exec()


            //Esta funcion se encargara de insertar solo las tiendas que no esten insertadas
            //Ademas de insertar la ciudad en estas tiendas
            await final_shops(city, input.shop)

            return city;



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

let final_shops = async (city, insertshops) => {

    //Obtenemos el id de la ciudad
    let id_city = city._id

    //Obtenemos las tiendas que ya tenemos en esta ciudad
    let shopincity = city.shop.map(shop => shop.name)

    //Y comparamos las tiendas que vamos a insertar con las que ya estan insertadas
    //y solo cogemos las que no esten ya insertadas
    let shopsToInclude = insertshops.filter(element => !shopincity.includes(element));

    //Convertimos todos los nombres de las tiendas en sus respectivos id
    let idShopsToInclude = [];
    for (let i = 0; i < shopsToInclude.length; i++) {

        let id_shop = await Shop.findOne({ name: shopsToInclude[i] }, { _id: 1 }).exec()
        idShopsToInclude.push(id_shop._id)
    }

    for (let z = 0; z < idShopsToInclude.length; z++) {

        //Añadimos cada tienda en el array "shop" que esta en la coleccion de ciudades
        await City.update({ _id: id_city }, { $push: { shop: idShopsToInclude[z] } }).exec()

        //Añadimos a cada tienda la ciudad en el array city que esta en la colecion de tienda
        await Shop.update({ _id: idShopsToInclude[z] }, { $push: { city: id_city } }).exec()
    }


}

module.exports = resolvers;