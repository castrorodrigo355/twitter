const {Schema, mongoose} = require("../database/database")
var solicitud = new Schema({ 
        fecha: String,
        idEmisor: { type: Schema.ObjectId, ref: "User" },
        nombreEmisor: String,
        apellidoEmisor: String,
        aceptado: Boolean,
        idReceptor: { type: Schema.ObjectId, ref: "User" }})
var Solicitud = mongoose.model("Solicitudes", solicitud)

module.exports = Solicitud