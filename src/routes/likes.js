const express = require("express");
const router = express.Router();
const User = require("../models/usuarioModel")
const Tweet = require("../models/tweetModel")
const Like = require("../models/likeModel")

// CREAR UN LIKE
router.post("/", (req, res) => {
    let data = req.body;
    let like = new Like(data);
    like.save()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(503).json(err));
})

// OBTENER LA LISTA DE LIKES DE UN TWEET
router.get("/:idTweet", (req, res) => {
    Like.find({tweetId: req.params.idTweet}, (err, likes) => {
        err ? res.json(err) : res.json(likes)
    })
})

// // ELIMINAR UN COMENTARIO "id"
// router.delete("/:idComentario", (req, res) => {
//     Comentario.findByIdAndDelete(req.params.idComentario)
//         .then(result => res.status(204).json({ messsage: 'deleted!'}))
//         .catch(err => res.status(503).json(err));
// })

// // ACTUALIZAR UN DETERMINADO COMENTARIO MEDIANTE UN "id"
// router.put("/:id", (req, res) => {
//     Comentario.findByIdAndUpdate(req.params.id, {$set: {"comentario": req.body.comentario
//                                                   }}, {new: true}, (err, doc) => {
//         err ? res.json(err) : res.json(doc)
//     })
// })

module.exports = router;