const express = require("express");
const Tweet = require("../models/tweetModel")
const router = express.Router();

// CREAR UN TWEET
router.post("/", (req, res) => {
    let data = req.body;
    let tweet = new Tweet(data);
    tweet.save()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(503).json(err));
})

// OBTENER LA LISTA DE Tweeters
router.get("/", (req, res) => {
    Tweet.find({}).then(tweets => res.json (tweets));
})

// OBTENER UN DETERMINADO TWEET MEDIANTE UN "id"
router.get("/:id", (req, res) => {
    Tweet.findById(req.params.id)
        .then(tweet => {
            if (tweet){
                res.json(tweet)
            } else {
                res.status(404).json({ message: 'not found!'})
            }
        });
})

// ELIMINAR UN DETERMINADO USUARIO MEDIANTE UN "id"
router.delete("/:id", (req, res) => {
    Tweet.findByIdAndDelete(req.params.id)
        .then( result => res.status(204).json({ messsage: 'deleted!'}))
        .catch( err => res.status(503).json(err));
})

// ACTUALIZAR UN DETERMINADO USUARIO MEDIANTE UN "id"
// router.put("/:id", (req, res) => {
//     User.findByIdAndUpdate(req.params.id, {$set: {"nombre": req.body.nombre, 
//                                                   "apellido": req.body.apellido,
//                                                   "celular": req.body.celular
//                                                   }}, {new: true}, (err, doc) => {
//         err ? res.json(err) : res.json(doc)
//     })
// })

// router.use("/:id/vuelos", routerVuelos)

module.exports = router;