const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('../database/knex');

const store = new KnexSessionStore({
    knex,
    tablename: 'sessions'
});

module.exports = store;