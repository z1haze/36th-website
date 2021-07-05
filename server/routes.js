const express = require('express');
const routes = express.Router(); // eslint-disable-line new-cap

routes.get('/', (req, res) => {
    res.render('index');
});

routes.get('/news', (req, res) => {
    res.render('news');
});

routes.get('/news/:articleSlug', (req, res) => {
    res.render('news/article');
});

routes.get('/streams', (req, res) => {
    res.render('streams');
});

routes.get('/sponsorships', (req, res) => {
    res.render('sponsorships');
});

routes.get('/division', (req, res) => {
    res.render('division');
});

routes.get('/divisions', (req, res) => {
    res.render('divisions');
});

routes.get('/application', (req, res) => {
    res.render('application');
});

routes.get('/store', (req, res) => {
    res.render('store');
});

routes.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = routes;