require('dotenv').config();

module.exports = function (app) {
    app.locals.APP_TITLE = process.env.APP_TITLE;
    app.locals.DISCORD_INVITE_URL = process.env.DISCORD_INVITE_URL;
    app.locals.FACEBOOK_URL = process.env.FACEBOOK_URL;
    app.locals.TWITTER_URL = process.env.TWITTER_URL;
    app.locals.TWITCH_URL = process.env.TWITCH_URL;
    app.locals.ROGUE_ENERGY_URL = process.env.ROGUE_ENERGY_URL;
    app.locals.GRILL_YOUR_ASS_OFF_URL = process.env.GRILL_YOUR_ASS_OFF_URL;
};