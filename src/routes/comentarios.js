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

// ELIMINAR EL COMENTARIO "id" DE UN TWEET "idTweet"
// router.delete("/:idComentario", (req, res) => {
//     Comentario.findOne({_id: req.params.id}, (err, tweet) => {
//         if(err) res.json(err)
//         tweet.comentarios = tweet.comentarios.filter(c => c._id != req.params.idComentario)
//         tweet.save()
//         res.json({mensaje:"Comentario eliminado"})
//     })
// })

// ACTUALIZAR UN VUELO DE UN DETERMINADO USUARIO MEDIANTE UN "id"
// router.put("/:idVuelo", (req, res) => {
//     User.findOne({_id: req.params.id}, (err, usuario) => {
//         if(err) res.json(err);
//         const vuelo = usuario.vuelos.find(unVuelo => unVuelo._id == req.params.idVuelo);
//         vuelo.destino = req.body.destino;
//         vuelo.duracion = req.body.duracion;
        
//         const index = usuario.vuelos.map((unVuelo, i) => {
//             if(unVuelo._id == vuelo._id){
//                 return i
//             }
//         })
//         const posicion = index[0];
//         usuario.vuelos.splice(posicion, vuelo)
//         usuario.save()
//             .then(result => res.status(201).json(result))
//             .catch(err => res.status(503).json(err));
//     })
// })

module.exports = router;