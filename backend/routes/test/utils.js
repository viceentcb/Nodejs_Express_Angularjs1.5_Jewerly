const faker = require('faker')
let mongoose = require('mongoose');
let User = mongoose.model('User');
var Jewel = mongoose.model('Jewel');
var Comment = mongoose.model('Comment');

exports.randoms = async function (qty, values) {
    let ray = []
    for (x = 0; x < values.length; x++) {
        let value = values[x].split(".")

        let randoms = []
        let db;
        let dbray = []

        //ASI ENTRARA SOLO UNA VEZ A LA BASE DE DATOS, NO UNA VEZ POR CADA USUARIO CREADO
        switch (value[1]) {

            case "userName":
                db = await User.find({}, { _id: 0, id_social: 1 })
                db = db.map(element => (element.id_social))
                break;

            case "email":
                db = await User.find({}, { _id: 0, email: 1 })
                db = db.map(element => (element.email))
                break;

            case "productName":
                db = await Jewel.find({}, { _id: 0, name: 1 })
                db = db.map(element => (element.name))
                break;
        }

        for (i = 0; i < qty; i++) {
            let random = faker[value[0]][value[1]]()

            dbray.includes(random) ?
                i-- :
                randoms.includes(random) ? i-- : randoms.push(random)
        }
        ray.push(randoms)
    }

    return ray

}

exports.tipe_price = async function (value) {
    return value < 300 ? "cheap" : value > 600 ? "expensive" : "normal"
}

exports.owner = async function (qty) {
    let users = [];
    for (i = 0; i < qty; i++) {
        let all_users = await User.find({}, { _id: 1 })
        let user = all_users[Math.floor(Math.random() * all_users.length)]
        users.includes(user) ? i-- : users.push(user)
    }
    return users
}

exports.jewel = async function (qty) {
    let jewels = [];
    for (i = 0; i < qty; i++) {
        let all_jewels = await Jewel.find({}, { _id: 1 })
        let jewel = all_jewels[Math.floor(Math.random() * all_jewels.length)]
        jewels.includes(jewel) ? i-- : jewels.push(jewel)
    }
    return jewels
}

exports.updateComentCount = async function (values) {

    for (i = 0; i < values.length; i++) {
        let data = await Jewel.find({ _id: values[i] }, { comments: 1, _id: 0 })

        // jewel.commentsCount = data[0].comments.length;
        await Jewel.update({ _id: values[i] }, { $set: { commentsCount: data[0].comments.length } })

    }
    // return res.sendStatus(200);

    // jewel.commentsCount = data[0].comments.length;
    // return jewel.save();

    // return Jewel.aggregate([{ "$match": { name: "Submarine" } }, { "$project": { count: { "$size": "$comments" } } }])
    //   .exec()

}

exports.insertComent = async function (_id) {
    let id_cmt = await Comment.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1)
    console.log(id_cmt[0])
    await Jewel.update({ _id: _id }, { $push: { comments: id_cmt[0] } })

}

exports.usertojewel=async function(){
    return await User.find({}, { _id: 1 }).sort({ _id: -1 }).limit(1)

}