require('dotenv').config();

const path = require('path');
const express = require('express');
const {v4: uuidv4} = require('uuid');
const app = express();
const http = require('http').createServer(app);

app
    .use(express.urlencoded({extended: true}))
    .use(express.json())
    .use(
        require('express-session')({
            secret           : process.env.COOKIE_SECRET,
            resave           : false,
            saveUninitialized: true,
            genid            : () => uuidv4(),
            name             : '36th.sid',
            cookie           : {
                maxAge: eval(process.env.SESSION_MAX_AGE)
            },
            store: require('./session/store')
        })
    )
    .use(express.static(path.join(__dirname, '../client/public')))
    .use('/', require('./routers'));

http.listen(process.env.APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App running on port http://localhost:${process.env.APP_PORT}`);
});