const {Schema, mongoose} = require("../database/database")
var comentario = new Schema({ 
        nombre: String, 
        apellido: String,
        comentario: String,
        autor: String})
var Comentario = mongoose.model("Comentario", comentario)

module.exports = Comentario