const express = require('express');
const routes = express.Router(); // eslint-disable-line new-cap

routes.get('/', (req, res) => {
    res.render('index');
});

routes.get('/history', (req, res) => {
    res.render('history');
});

routes.get('/news', (req, res) => {
    res.render('news');
});

routes.get('/news/:articleSlug', (req, res) => {
    res.render('news/article');
});

routes.get('/sponsors', (req, res) => {
    res.render('sponsors');
});

routes.get('/streamers', (req, res) => {
    res.render('streamers');
});

routes.get('/apply', (req, res) => {
    res.render('apply');
});

routes.get('/shop', (req, res) => {
    res.render('shop');
});

routes.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = routes;