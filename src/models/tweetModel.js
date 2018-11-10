const {Schema, mongoose} = require("../database/database")
var twit = new Schema({ nombre: String,
                        apellido: String,
                        fecha: String,
                        descripcion: String,
                        usuarioId: { type: Schema.ObjectId, ref: "User" }})
var Twit = mongoose.model("Twit", twit)

module.exports = Twit