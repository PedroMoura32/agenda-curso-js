const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController')

// Rotas do home
route.get('/', homeController.index)


module.exports = route