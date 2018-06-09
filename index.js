'use strict'

var app=require('./app');
var server=app;

var firebase=require('./database/firebaseAcces');

var port=3800;

var youtube=require('youtube-api-search');

const API_KEY='AIzaSyBdTt5do4wBJFqYFpzPOreeXFQrJILiMTA';

var stream = require('youtube-audio-stream')


//Levantar el servidor
server.listen(
    port,
    ()=>{console.log("Servidor Corriendo")
    }
);

//firebase[1]('users').then((data)=>{console.log(data)});

