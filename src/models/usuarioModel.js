const {Schema, mongoose} = require("../database/database")
var user = new Schema({ nombre: String,
                        apellido: String,
                        celular: String,
                        dni: String,
                        email: String})
var User = mongoose.model("User", user)

module.exports = User