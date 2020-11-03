let router = require('express').Router();
let mongoose = require('mongoose');
let utils = require('./utils');
var Comment = mongoose.model('Comment');


router.get('/:usrqty/:cmtqty/:jwqty', async (req, res, next) => {
    let usrqty = req.params.usrqty;
    let cmtqty = req.params.cmtqty;
    let jwqty = req.params.jwqty;

    let tot_com = usrqty * cmtqty * jwqty
    // await utils.find(ray)
    // let ray=[['User',usrqty],['Jewel',jwqty]]

    let author = await utils.owner(usrqty)
    console.log(author)

    let random_values = ["lorem.text"]
    let comments = await utils.randoms(tot_com, random_values)
    comments = comments[0]
    // console.log(comments[0].length)

    let jewel = await utils.jewel(jwqty)
    // console.log(jewel)



    for (let i = 0; i < usrqty; i++) {

        for (let x = 0; x < jwqty; x++) {

            for (let z = 0; z < cmtqty; z++) {
                // console.log(author[i])
                // console.log( jewel[x])

                comment = new Comment();
                comment.body = comments[z]
                comment.jewel = jewel[x]
                comment.author = author[i]
                console.log(comment)

                await comment.save()
                await utils.insertComent(jewel[x])

            }
            comments.splice(0, 2);
            z = 0
        }
        x = 0
    }
    await utils.updateComentCount(jewel)
    return res.sendStatus(200);






})
module.exports = router