exports.up = function (knex) {
    return knex.schema.createTable('blog_categories', function (table) {
        table.increments('category_id').primary();
        table.string('name');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('blog_categories');
};