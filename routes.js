const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const contatoController = require('./src/controllers/contatoController')
const sobreController = require('./src/controllers/sobreController')

// Rotas do home
route.get('/', homeController.paginaInicial)
route.post('/', homeController.trataPost)

route.get('/contato', contatoController.paginaInicial)
route.get('/sobre', sobreController.paginaInicial)

module.exports = route