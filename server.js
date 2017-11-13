'use strict'
//VARIABLES
/*
var persona = {
    nombres: "Josue Gaston",
    apellidos: "Tavara Idrogo"
}
*/
// REQUERIMIENTO DE MODULOS
var express = require('express');
var swig = require('swig');
// Requerimiento de mongoose
var mongoose = require('mongoose');


//CONFIGURACIONES
// Creación del servidor web con express
var server = express();
// Integracion del motor de templates swig
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });

// CONFIGURACIONES DB
// Integración de mongoose
mongoose.connect('mongodb://localhost/reto2BackEnd', { useMongoClient: true });
mongoose.Promise = global.Promise
// Requerimiento de modelo speciality
var User = require('./models/user');
var Amigo = require('./models/amigo');


// PETICIONES
// Cuando exista una petición en el servidor  
server.get('/', function (req, res) {
    User.find().then(
        function (usuarios) {//viene de la BD
            res.render('template.html', { user: usuarios });
        }
    )
});

//Creacion de una instancia mediante DIRECCION URL
server.get('/agregar/:nombres/:apellidos/', function (req, res) {
    //Obtencion de parametros de url
    var nombres = req.params.nombres;
    var apellidos = req.params.apellidos;
    //Crear una instancia del modelo speciality
    var user = new User({ nombres: nombres, apellidos: apellidos })
    //Guardar instancia del modelo
    user.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            // Redireccion a home
            res.redirect('/');
        }
    });
});


// INICIAR SERVIDOR

// Se corre el servidor en el puerto 8000
server.listen(8000, function () {
    console.log('Servidor esta escuchando en el puerto ' + 8000)
});