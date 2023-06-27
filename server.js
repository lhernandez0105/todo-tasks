const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.listen(port, function () {
    console.log("El servidor esta escuchando en el puerto: " + port);
});

app.get('/', function (req, res) {
    res.send("El famoso hola mundo");
});
