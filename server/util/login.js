const axios = require('axios');

module.exports = async (req, res) => {
    const code = req.body.code;
    const redirect_uri = req.body.redirect;

    let access_token;

    try {
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
    await axios.get('https://discord.com/api/users/@me', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
        .then(async ({data}) => {
            res.json({
                discord_user_id      : data.id,
                discord_username     : data.username,
                discord_discriminator: data.discriminator,
                discord_avatar_hash  : data.avatar,
                canApply             : await require('./check_can_apply')(data.id)
            });
        });

};