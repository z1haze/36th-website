const {Model} = require('objection');
const knex = require('../database/knex');

Model.knex(knex);

class Base extends Model {
    $beforeInsert () {
        this.created_at = new Date().toISOString();
    }

    $beforeUpdate () {
        this.updated_at = new Date().toISOString();
    }
}

module.exports = Base;