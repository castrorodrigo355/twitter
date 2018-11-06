const express = require("express");
const router = express.Router({mergeParams : true});
const User = require("../models/usuarioModel")
const Tweet = require("../models/tweetModel")
const Comentario = require("../models/comentarioModel")

// DADO UN TWEET CREAR UN COMENTARIO
router.post("/", (req, res) => {
    const unComentario = new Comentario(req.body)
    //console.log(req.body)
    Tweet.findOne({_id: req.params.id}, (err, tweet) => {
            err ? res.json(err) : res.json(tweet)
            tweet.comentarios.push(unComentario)
            tweet.save()
    })
})

// OBTENER LA LISTA DE COMENTARIOS DE UN TWEET
router.get("/", (req, res) => {
    Tweet.findOne({_id: req.params.id}, (err, tweet) => {
        err ? res.json(err) : res.json(tweet.comentarios)
    })
})

// OBTENER EL VUELO "id" DE UN USUARIO
// router.get("/:idVuelo", (req, res) => {
//     User.findOne({_id: req.params.id}, (err, usuario) => {
//         if(err) res.json(err)
//         unVuelo = usuario.vuelos.find(unVuelo => unVuelo._id == req.params.idVuelo)
//         if(unVuelo){
//             res.json(unVuelo)
//         }else{
//             res.json({mensaje:"Vuelo no encontrado"})
//         }
//     })
// })

// ELIMINAR EL COMENTARIO "id" DE UN TWEET
router.delete("/:idComentario", (req, res) => {
    Tweet.findOne({_id: req.params.id}, (err, tweet) => {
        if(err) res.json(err)
        tweet.comentarios = tweet.comentarios.filter(c => c._id != req.params.idComentario)
        tweet.save()
        res.json({mensaje:"Comentario eliminado"})
    })
})

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