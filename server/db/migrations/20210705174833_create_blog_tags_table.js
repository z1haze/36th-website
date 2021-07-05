exports.up = function (knex) {
    return knex.schema.createTable('blog_tags', function (table) {
        table.increments('tag_id').primary();
        table.string('name');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('blog_tags');
};