const faker = require('faker')
let mongoose = require('mongoose');
var Jewel = mongoose.model('Jewel');
let utils = require('./utils');


exports.jewels = async (...variables) => {
    let req = variables[0]; let res = variables[1]; let next = variables[2];
    let from = variables[3];
    try {
        let random_brand = ["Cartier", "Rolex", "Pandora"]
        let random_type = ["Bracelet", "Watch", "Necklace"]
        let random_values = ["commerce.productName"]

        let owner;
        let qty;

        await ((from == 'jewel')
            ? (async () => {
                console.log("------------------")
                owner = await utils.owner(1)
                owner = owner[0]
                qty = req.params.qty
                return (owner, qty)
            })()
            : (() => {
                owner = variables[3][0]
                qty = variables[3][1]
            })());

        let randoms = await utils.randoms(qty, random_values)

        for (let i = 0; i < qty; i++) {
            jewel = new Jewel();
            jewel.name = randoms[0][i];
            jewel.brand = random_brand[Math.floor(Math.random() * random_brand.length)];
            jewel.type = random_type[Math.floor(Math.random() * random_type.length)];
            jewel.price = faker.commerce.price();
            jewel.owner = owner[0]
            jewel.tagList[jewel.brand, jewel.type, await utils.tipe_price(jewel.price)]

            await jewel.save()

        }
    } catch (e) {
        next(e);
    }

   return from == 'jewel'? res.sendStatus(200) : false

}