exports.up = function (knex) {
    return knex.schema.createTable('discord_members', function (table) {
        table.string('discord_user_id').primary();
        table.string('discord_username');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('discord_members');
};
