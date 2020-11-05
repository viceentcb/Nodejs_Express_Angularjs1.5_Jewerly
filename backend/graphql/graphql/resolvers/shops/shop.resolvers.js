const mongoose = require('mongoose');
const Shop = mongoose.model('Shop');
const City = mongoose.model('City');


const resolvers = {

    Query: {
        shop: (root, { slug }) => {
            return Shop.findOne({ slug: slug }).exec();
        },
        shops: () => {
            return Shop.find().exec();
        }
    },

    Mutation: {
        createShop: (root, { input }) => {
            const shop = new Shop(input);

            // no .exec();
            shop.save();
            return shop;
        },
        updateCityinShop: async (root, { input }) => {

            //Obtenemos la tienda que vamos a modificar con sus respectivas ciudades
            let shop = await Shop.findOne({ name: input.name })
                .populate('city')
                .exec()

            //Esta funcion se encargara de insertar solo las ciudades que no esten insertadas
            //Ademas de insertar la tienda en estas ciudades
            await final_cities(shop, input.city)

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

let final_cities = async (shop, insertcities) => {
    //Obtenemos el id de la tienda
    let id_shop = shop._id

    //Obtenemos las ciudades que ya tenemos en esta tienda
    let cityinshop = shop.city.map(city => city.name)

    //Y comparamos las ciudades que vamos a insertar con las que ya estan insertadas
    //y solo cogemos las que no esten ya insertadas
    let citiesToInclude = insertcities.filter(element => !cityinshop.includes(element));

    //Convertimos todos los nombres de las ciudades en sus respectivos id
    let idCitiesToInclude = [];
    for (let i = 0; i < citiesToInclude.length; i++) {

        let id_city = await City.findOne({ name: citiesToInclude[i] }, { _id: 1 }).exec()
        idCitiesToInclude.push(id_city._id)
    }

    for (let z = 0; z < idCitiesToInclude.length; z++) {

        //Añadimos cada ciudad en el array "city" que esta en la coleccion de tiendas
        await Shop.update({ _id: id_shop }, { $push: { city: idCitiesToInclude[z] } }).exec()

        //Añadimos a cada ciudad la tienda en el array shop que esta en la colecion de ciudades
        await City.update({ _id: idCitiesToInclude[z] }, { $push: { shop: id_shop } }).exec()
    }


}

module.exports = resolvers;