const mongoose = require("mongoose")
const Schema = mongoose.Schema
mongoose.connect("mongodb://localhost/dbtwitter", {useNewUrlParser: true})

module.exports = {Schema, mongoose}