exports.up = function (knex) {
    return knex.schema.createTable('unit_applications', function (table) {
        table.string('application_id').primary();
        table.string('discord_user_id');
        table.json('content');
        table.enum('state', ['IN VOTING', 'ACCEPTED', 'DENIED', 'ON HOLD']);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('unit_applications');
};
