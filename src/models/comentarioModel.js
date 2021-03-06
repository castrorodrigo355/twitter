const {Schema, mongoose} = require("../database/database")
var comentario = new Schema({ 
        nombre: String, 
        apellido: String,
        comentario: String,
        tweetId: { type: Schema.ObjectId, ref: "Twit" },
        usuarioId: { type: Schema.ObjectId, ref: "User" }})
var Comentario = mongoose.model("Comentario", comentario)

module.exports = Comentario