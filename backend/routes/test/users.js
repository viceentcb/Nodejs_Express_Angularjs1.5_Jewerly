let router = require('express').Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let utils = require('./utils');
let utils_jewels = require('./utils_jewels');



router.get('/:qty/:jwqty', async(req, res, next) => {
    try {
        let qty = req.params.qty;
        let jwqty = req.params.jwqty
        let random_values = ["internet.userName", "internet.email", "image.avatar"]

        let randoms = await utils.randoms(qty, random_values)

        for (let i = 0; i < qty; i++) {
            user = new User();
            user.id_social = randoms[0][i];
            user.username = randoms[0][i];
            user.email = randoms[1][i];
            user.image = randoms[2][i];
            user.setPassword("123456789");

            await user.save()

            if (jwqty > 0) {
                let user = await utils.usertojewel()
                let ray = [user, jwqty]
                await utils_jewels.jewels(req, res, next, ray)
            }

        }

    } catch (e) {
        next(e);
    }
    return res.sendStatus(200);

})
module.exports = router