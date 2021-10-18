const express = require('express');
const router = express.Router();

/**
 * Render Home Page
 */
router.get('/', (req, res) => res.render('index'));

/**
 * Render Unit History Page
 */
router.get('/history', (req, res) => res.render('history'));

/**
 * Contact Us Page
 */
router.use('/contact', require('./contact'));

/**
 * Roster Page
 */
router.use('/roster', require('./roster'));

/**
 * OAUTH Login (NOT USED ATM)
 */
router.use('/login', require('./login'));

module.exports = router;