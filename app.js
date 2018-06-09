'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var firebase = require('./database/firebaseAcces');

var app = express();

const path = require('path');
const mediaserver = require('mediaserver');

//cargar rutas

//middlewares
//Método que se ejecuta antes que una petición llegue a un controlador
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rutas del servidor
app.get('/', (req, res) => {

    res.status(200).send(
        { menssage: "Hola Mundo!" }
    );
});

app.get('/canciones/:nombre', (req, res) => {
    var cancion = path.join(__dirname, 'canciones', req.params.nombre + '.mp3');
    mediaserver.pipe(req, res, cancion);
    console.log("id" + req.params.nombre);
});

app.get('/comprobar/:nombre', (req, res) => {

    firebase[2](req.params.nombre).then(() => {
        console.log("YAAAAAA");
        res.status(200).send({ mensaje: "mensaje" });
        
    }
    );

    /*res.status(200).send(new Promise((resolve, reject) =>
        resolve(
            {mensaje:"mensaje"} 
        )
    )
    )*/

});


//Exportar configuracion
module.exports = app;