const express = require("express");
const router = express.Router();
const User = require("../models/usuarioModel")
const Tweet = require("../models/tweetModel")
const Comentario = require("../models/comentarioModel")

// CREAR UN COMENTARIO
router.post("/", (req, res) => {
    let data = req.body;
    let comentario = new Comentario(data);
    comentario.save()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(503).json(err));
})

// OBTENER LA LISTA DE COMENTARIOS DE UN TWEET
router.get("/:idTweet", (req, res) => {
    Comentario.find({tweetId: req.params.idTweet}, (err, comentarios) => {
        err ? res.json(err) : res.json(comentarios)
    })
})

// ELIMINAR UN COMENTARIO "id"
router.delete("/:idComentario", (req, res) => {
    Comentario.findByIdAndDelete(req.params.idComentario)
        .then(result => res.status(204).json({ messsage: 'deleted!'}))
        .catch(err => res.status(503).json(err));
})

// ACTUALIZAR UN DETERMINADO COMENTARIO MEDIANTE UN "id"
router.put("/:id", (req, res) => {
    Comentario.findByIdAndUpdate(req.params.id, {$set: {"comentario": req.body.comentario
                                                  }}, {new: true}, (err, doc) => {
        err ? res.json(err) : res.json(doc)
    })
})

module.exports = router;