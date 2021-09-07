require('dotenv').config();

module.exports = function (app) {
    app.locals.APP_TITLE = process.env.APP_TITLE;
    app.locals.DISCORD_INVITE = process.env.DISCORD_INVITE;
};