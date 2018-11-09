const {Schema, mongoose} = require("../database/database")

var like = new Schema({ fecha: String,
                        tweetId: { type: Schema.ObjectId, ref: "User" },
                        usuarioId: { type: Schema.ObjectId, ref: "Twit" }})
var Like = mongoose.model("Like", like)

module.exports = Like