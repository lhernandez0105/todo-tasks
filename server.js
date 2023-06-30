const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const api = require('./api');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(port, function () {
    console.log("El servidor esta escuchando en el puerto: " + port);
});

app.get('/', function (req, res) {
    res.send("El famoso hola mundo");
});

app.use('/api', api);
