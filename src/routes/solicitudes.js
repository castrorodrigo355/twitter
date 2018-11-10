const express = require("express");
const Solicitud = require("../models/solicitudModel")
// const User = require("../models/usuarioModel")
const router = express.Router();

// CREAR UNA SOLICITUD
router.post("/", (req, res) => {
    let data = req.body;
    let solicitud = new Solicitud(data);
    solicitud.save()
        .then(result => res.status(201).json(result))
        .catch(err => res.status(503).json(err));
})

// OBTENER LA LISTA DE SOLICITUDES
router.get("/", (req, res) => {
    Solicitud.find({}).then(solicitudes => res.json(solicitudes));
})

// OBTENER LAS SOLICITUDES A UN USUARIO "id"
router.get("/:id", (req, res) => {
    Solicitud.find({idReceptor: req.params.id}, (err, solicitudes) => {
        err ? res.json(err) : res.json(solicitudes)
    })
})

// ELIMINAR UNA SOLICITUD "id"
router.delete("/:idSolicitud", (req, res) => {
    Solicitud.findByIdAndDelete(req.params.idSolicitud)
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

module.exports = router;