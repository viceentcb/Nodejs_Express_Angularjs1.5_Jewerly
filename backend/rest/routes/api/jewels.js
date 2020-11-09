var router = require('express').Router();
var mongoose = require('mongoose');
var Jewel = mongoose.model('Jewel');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');
let graphql = require('./request');
const { request } = require('http');


router.param('jewel', function (req, res, next, slug) {
    Jewel.findOne({ slug: slug })
        .populate('owner')
        .then(function (jewel) {
            if (!jewel) { return res.sendStatus(404); }

            req.jewel = jewel;

            return next();
        }).catch(next);
});

router.param('comment', function (req, res, next, id) {
    Comment.findById(id).then(function (comment) {
        if (!comment) { return res.sendStatus(404); }

        req.comment = comment;

        return next();
    }).catch(next);
});

//Feed 
router.get('/feed', auth.required, function (req, res, next) {
    var limit = 20;
    var offset = 0;

    if (typeof req.query.limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== 'undefined') {
        offset = req.query.offset;
    }

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
        console.log("--------------------------------")
        console.log(user)
        Promise.all([
            Jewel.find({ owner: { $in: user.following } })
                .limit(Number(limit))
                .skip(Number(offset))
                .sort({ rating: 'desc' })
                .populate('owner')
                .exec(),
            Jewel.count({ owner: { $in: user.following } })
        ]).then(function (results) {
            var jewels = results[0];
            var jewelsCount = results[1];

            return res.json({
                jewels: jewels.map(function (jewel) {
                    return jewel.toJSONFor(user);
                }),
                jewelsCount: jewelsCount
            });
        }).catch(next);
    });
});

// return all jewells
router.get('/', auth.optional, function (req, res, next) {
    // listCities();

    var query = {};
    var limit = 20;
    var offset = 0;

    if (typeof req.query.limit !== 'undefined') {
        limit = req.query.limit;
    }

    if (typeof req.query.offset !== 'undefined') {
        offset = req.query.offset;
    }

    if (typeof req.query.tag !== 'undefined') {
        query.tagList = { "$in": [req.query.tag] };
    }

    Promise.all([
        req.query.owner ? User.findOne({ username: req.query.owner }) : null,
        req.query.favorited ? User.findOne({ username: req.query.favorited }) : null
    ]).then(function (results) {
        var owner = results[0];
        var favoriter = results[1];

        if (owner) {
            query.owner = owner._id;
        }

        if (favoriter) {
            query._id = { $in: favoriter.favorites };
        } else if (req.query.favorited) {
            query._id = { $in: [] };
        }

        return Promise.all([
            Jewel.find(query)
                .limit(Number(limit))
                .skip(Number(offset))
                .sort({ rating: 'desc' })
                .populate('owner')
                .exec(),
            Jewel.count(query).exec(),
            req.payload ? User.findById(req.payload.id) : null,
        ]).then(function (results) {
            var jewels = results[0];
            var jewelsCount = results[1];
            var user = results[2];

            return res.json({
                jewels: jewels.map(function (jewel) {
                    return jewel.toJSONFor(user);
                }),
                jewelsCount: jewelsCount
            });
        });
    }).catch(next);
});

router.all('/cities',async  function (_, res) {
    return res.json({ cities: await graphql.cities() });
});

router.all('/shops', auth.optional,async  function (_, res) {
    return res.json({ shops: await graphql.shops() });
});
//obtain a jewel by slug
router.get('/:jewel', auth.optional, function (req, res, next) {
    Promise.all([
        req.payload ? User.findById(req.payload.id) : null,
        req.jewel.populate('author').execPopulate()
    ]).then(function (results) {
        var user = results[0];

        return res.json({ jewel: req.jewel.toJSONFor(user) });
    }).catch(next);
});

//insert a jewel by owner
router.post('/', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }

        var jewel = new Jewel(req.body.jewel);

        jewel.owner = user;

        return jewel.save().then(function () {
            return res.json({ jewel: jewel.toJSONFor(user) });
        });
    }).catch(next);
});

// update jewel
router.put('/:jewel', auth.required, function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (req.jewel.owner._id.toString() === req.payload.id.toString()) {
            if (typeof req.body.jewel.name !== 'undefined') {
                req.jewel.name = req.body.jewel.name;
            }

            if (typeof req.body.jewel.brand !== 'undefined') {
                req.jewel.brand = req.body.jewel.brand;
            }

            if (typeof req.body.jewel.type !== 'undefined') {
                req.jewel.body = req.body.jewel.type;
            }

            if (typeof req.body.jewel.price !== 'undefined') {
                req.jewel.body = req.body.jewel.price;
            }

            if (typeof req.body.jewel.tagList !== 'undefined') {
                req.jewel.tagList = req.body.jewel.tagList
            }

            req.jewel.save().then(function (jewel) {
                return res.json({ jewel: jewel.toJSONFor(user) });
            }).catch(next);
        } else {
            return res.sendStatus(403);
        }
    });
});

// delete jewel 
router.delete('/:jewel', auth.required, async function (req, res, next) {

    try {

        let user = await User.findById(req.payload.id)

        if (!user) { return res.sendStatus(401); }

        if (req.jewel.owner._id.toString() === req.payload.id.toString()) {
            let comments = await req.jewel.getcomments()
            for (i = 0; i < comments.length; i++) {
                await delcomment(comments[i])
            }
            await req.jewel.remove()
            return res.sendStatus(204);
        } else {
            return res.sendStatus(403);
        }
    } catch(next) {
        (next)
    }
});

// Favorite an jewel
router.post('/:jewel/favorite', auth.required, async function (req, res, next) {
    var jewelId = req.jewel._id;

    let user = await User.findById(req.payload.id)
    if (!user) { return res.sendStatus(401); }

    await user.favorite(jewelId)
    let jewel = await req.jewel.updateFavoriteCount()

    let ray = [[user, +5], [req.jewel.owner, +10]]
    await user.updatekarma(ray)

    await req.jewel.updaterating(jewelId, +5)

    return res.json({
        jewel: jewel.toJSONFor(user)
    })
});

// // // Unfavorite an jewel
router.delete('/:jewel/favorite', auth.required, async function (req, res, next) {
    var jewelId = req.jewel._id;

    let user = await User.findById(req.payload.id)
    if (!user) { return res.sendStatus(401); }

    await user.unfavorite(jewelId)
    let jewel = await req.jewel.updateFavoriteCount()

    let ray = [[user, -5], [req.jewel.owner, -10]]
    await user.updatekarma(ray)

    await req.jewel.updaterating(jewelId, -5)

    return res.json({
        jewel: jewel.toJSONFor(user)
    })
});

// // return an jewel's comments
router.get('/:jewel/comments', auth.optional, function (req, res, next) {
    Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function (user) {
        return req.jewel.populate({
            path: 'comments',
            populate: {
                path: 'author'
            },
            options: {
                sort: {
                    createdAt: 'desc'
                }
            }
        }).execPopulate().then(function (jewel) {
            return res.json({
                comments: req.jewel.comments.map(function (comment) {
                    return comment.toJSONFor(user);
                })
            });
        });
    }).catch(next);
});

// // // create a new comment
router.post('/:jewel/comments', auth.required, async function (req, res, next) {
    let user = await User.findById(req.payload.id)
    if (!user) { return res.sendStatus(401); }

    var comment = new Comment(req.body.comment);
    comment.jewel = req.jewel;
    comment.author = user;
    await comment.save()

    req.jewel.comments = req.jewel.comments.concat([comment]);
    await req.jewel.save()

    await req.jewel.updateComentsCount()

    let ray = [[user, +8], [req.jewel.owner, +15]]
    await user.updatekarma(ray)

    await req.jewel.updaterating(req.jewel._id, +10)


    res.json({ comment: comment.toJSONFor(user) });

});

// // // delete a new comment
router.delete('/:jewel/comments/:comment', auth.required, async function (req, res, next) {
    if ((req.comment.author.toString() === req.payload.id.toString()) ||
        (req.jewel.owner._id.toString() === req.payload.id.toString())) {
        req.jewel.comments.remove(req.comment._id);
        await req.jewel.save()

        await delcomment(req.comment._id)

        await req.jewel.updateComentsCount()

        let user = await User.findById(req.payload.id)
        let ray = [[user, -8], [req.jewel.owner, -15]]
        await user.updatekarma(ray)

        await req.jewel.updaterating(req.jewel._id, -10)

        res.sendStatus(204);


    } else {
        res.sendStatus(403);
    }
});


let delcomment = async (id) => {

    await Comment.find({ _id: id }).remove().exec()
}

module.exports = router;