exports.up = function (knex) {
    return knex.schema.createTable('unit_members', function (table) {
        table.string('discord_user_id').primary();
        table.string('discord_username');
        table.string('discord_discriminator');
        table.string('discord_nickname');
        table.string('discord_avatar_hash');
        table.timestamp('join_date');
        table.boolean('is_active');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('unit_members');
};
