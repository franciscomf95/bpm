'use strict'

var user=require('../facade/userFacade');
var getUser=user[0];
var getAllUsers=user[1];
var postUser=user[2];

function comprobarUsuario(token,object){
    let allUsers=getAllUsers();


    for (var value in allUsers){
        if(object.username===allUsers[value].username && object.password===allUsers[value].password) return true;
    }

    return false;

}