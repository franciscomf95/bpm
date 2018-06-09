'use strict'

var firebase=require('../database/firebaseAcces')
var post=firebase[0];
var get=firebase[1];

function getUser(token){
    return get('users/'+token);
}

function getAllUsers(){
    return get('users');
}

function postUser(object){
    post('users',object);
    return true;
}

module.exports=[getUser,getAllUsers,postUser];