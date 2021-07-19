const express = require('express');
const routes = express.Router(); // eslint-disable-line new-cap

// home
routes.get('/', (req, res) => {
    res.render('index');
});

// unit history
routes.get('/history', (req, res) => {
    res.render('history');
});

// news main
routes.get('/news', (req, res) => {
    res.render('news');
});

// news article
routes.get('/news/:articleSlug', (req, res) => {
    res.render('news/article');
});

// sponsors
routes.get('/sponsors', (req, res) => {
    res.render('sponsors');
});

// streams
routes.get('/streamers', (req, res) => {
    res.render('streamers');
});

// application
routes.get('/apply', (req, res) => {
    res.render('apply');
});

// merch/store
routes.get('/shop', (req, res) => {
    res.render('shop');
});

// contact
routes.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = routes;