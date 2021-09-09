const express = require('express');
const routes = express.Router(); // eslint-disable-line new-cap

const axios = require('axios');

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

// login user with discord code
routes.post('/login', async (req, res) => {
    const code = req.body.code;

    let access_token;
    const redirect_uri = req.body.redirect;

    try {
        // authenticate with discord and get an access token
        ({data: {access_token}} = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            'client_id'    : process.env.OAUTH_CLIENT_ID,
            'client_secret': process.env.OAUTH_CLIENT_SECRET,
            'redirect_uri' : redirect_uri,
            'grant_type'   : 'authorization_code',
            'scope'        : 'identify',
            code
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }));
    } catch ({response}) {
        return res.status(response.status).json({
            error  : true,
            message: response.data.error_description
        });
    }

    // fetch user data with the access token we got from discord
    const {data} = await axios.get('https://discord.com/api/users/@me', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });

    // pass the user back to the browser
    res.json({
        discord_user_id      : data.id,
        discord_username     : data.username,
        discord_discriminator: data.discriminator,
        discord_avatar_hash  : data.avatar,
        canApply             : await require('./util/check_can_apply')(data.id)
    });
});

module.exports = routes;