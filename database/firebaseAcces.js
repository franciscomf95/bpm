'use strict'
var database = require('firebase-admin');
const express = require('express');

//Conexión Base de datos
var conecction = require('./firebase');
const router = express.Router();
console.log("Conexión establecida con Firebase");


const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

var YTSearch = require('youtube-api-search');

const fs = require('fs');


database.initializeApp({
    credential: database.credential.cert(conecction),
    databaseURL: 'https://bpm-database.firebaseio.com/'
});


function post(token, object) {
    //Cargar archivo en firebase
    const ref = database.database().ref(token).push();
    ref.set(object);
    console.log("Elemento insertado correctamente en Firebase");
}

function get(token) {
    return new Promise((resolve, rejec) => {
        database.database().ref(token).once('value')
            .then((response) => {
                resolve(response.val());
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function youtube(id) {
    return new Promise((resolve, reject) => {
        const file = "canciones/" + id + ".mp3";
        // Check if the file exists in the current directory.
        fs.stat(file, (err, stat)=>{
            if (err !== null) {
                console.log("No existe");

                let stream = ytdl(id, {
                    quality: 'highestaudio',
                    //filter: 'audioonly',
                });

                let start = Date.now();
                ffmpeg(stream)
                    .audioBitrate(128)
                    .save(file)
                    .on('progress', (p) => {
                        readline.cursorTo(process.stdout, 0);
                        process.stdout.write(`${p.targetSize}kb downloaded`);
                    })
                    .on('end', () => {
                        console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
                        resolve();
                    });
                
            }else{
                console.log("Existe");
                resolve();
            }

        });
    })
}

function searchYT(term) {
    const API_KEY = 'AIzaSyBdTt5do4wBJFqYFpzPOreeXFQrJILiMTA';
    YTSearch({ key: API_KEY, t: "viva la vida" }, song => { console.log(song) });
}

module.exports = [post, get, youtube, searchYT];

