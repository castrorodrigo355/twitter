const {Schema, mongoose} = require("../database/database")
var twit = new Schema({ titulo: String,
                        fecha: String,
                        descripcion: String,
                        likes: Number,
                        comentarios: Array,
                        usuario: { type: Schema.ObjectId, ref: "User" }})
var Twit = mongoose.model("Twit", twit)

module.exports = Twit