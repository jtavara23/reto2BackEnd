'use strict'

// Requerimiento de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// Definición del esquema
var amigoSchema = new Schema({
    nombres: { type: String, required: true, unique: true },
    apellidos: { type: String, required: true, unique: true  },
    created: { type: Date, default: Date.now },
})

// Convertimos a modelo y exportamos
module.exports = mongoose.model('amigo', amigoSchema)