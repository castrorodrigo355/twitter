const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// ----------------------------------------------------------
const routerLogin = require('./routes/login');
app.use('/login', routerLogin);
// ----------------------------------------------------------
const routerUsuarios = require("./routes/usuarios");
const authValidator = require('./middlewares/authValidator');
app.use("/usuarios", authValidator, routerUsuarios);
// app.use("/usuarios", routerUsuarios);
// ----------------------------------------------------------
const routerTwit = require("./routes/tweet");
app.use('/tweets', authValidator, routerTwit);
// ----------------------------------------------------------
const routerLikes = require("./routes/likes");
app.use('/likes', routerLikes);
// ----------------------------------------------------------
const routerComentario = require("./routes/comentarios");
app.use('/comentarios', routerComentario);
// ----------------------------------------------------------
const routerSolicitudes = require("./routes/solicitudes");
app.use('/solicitudes', routerSolicitudes);
// ----------------------------------------------------------
app.get("/*", (req, res) => {
    res.end("Archivo no encontrado");
});
// ----------------------------------------------------------
app.listen(3000, () => {
    console.log("Servidor funcionando");
});