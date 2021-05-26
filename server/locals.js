require('dotenv').config();

module.exports = function (app) {
    app.locals.TITLE = process.env.APP_TITLE;
};