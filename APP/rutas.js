// Rutas de los servicios

const express = require('express');
const funciones = require('./controlador');

const rutas = express.Router();

rutas.post('/tramasAstro', funciones.tramasAstro);
rutas.post('/tramasChance', funciones.tramasChance);
rutas.post('/tramasOnline', funciones.tramasOnline);

module.exports = rutas;