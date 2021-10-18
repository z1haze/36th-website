
exports.up = function (knex) {
    return knex.schema.createTable('unit_member_notes', function (table) {
        table.increments('note_id').primary();
        table.string('member_discord_user_id');
        table.string('author_discord_user_id');
        table.text('content');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('unit_member_notes');
};
