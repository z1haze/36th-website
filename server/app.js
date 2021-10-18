require('dotenv').config();

const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const {v4: uuidv4} = require('uuid');
const favicon = require('serve-favicon');

// create the express app
const app = express();

// load our resource messages
require('./resources')(app);

app
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(
        require('express-session')({
            secret           : process.env.COOKIE_SECRET,
            resave           : false,
            saveUninitialized: true,
            genid            : function () {
                return uuidv4();
            },
            name  : '36th.sid',
            cookie: {
                maxAge: eval(process.env.SESSION_MAX_AGE)
            },
            store: require('./session/store')
        })
    )
    .use('/', require('./routers'))
    .use(express.static(path.join(__dirname, '..', 'client/public')))
    .use(favicon(path.join(__dirname, '..', 'client/public', 'favicon.ico')))
    .engine('hbs', hbs({
        extname: 'hbs',
        helpers: require('./handlebars/helpers')
    }))
    .set('view engine', 'hbs')
    .set('views', path.join(__dirname, 'views'));

// start our app
app.listen(process.env.APP_PORT, () => {
    console.log(`App running on port ${process.env.APP_PORT}`); // eslint-disable-line no-console
});