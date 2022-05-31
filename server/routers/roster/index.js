const express = require('express');
const router = express.Router();

/**
 * Render Page View
 */
router.get('/', async (req, res) => {
    const roster = await require('../../roster/factory').get();

    res.render('roster', {roster});
});

module.exports = router;