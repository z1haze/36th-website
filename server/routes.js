const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => res.render('index'));
routes.get('/history', (req, res) => res.render('history'));
routes.get('/sponsors', (req, res) => res.render('sponsors'));
routes.get('/application', (req, res) => res.render('apply'));

routes.get('/contact', (req, res) => res.render('contact'));
routes.post('/contact', ...require('./util/send_mail'));

routes.post('/login', require('./util/login'));

module.exports = routes;