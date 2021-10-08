exports.up = function (knex) {
    return knex.schema.createTable('blog_categories_posts', function (table) {
        table.string('category_id');
        table.string('post_id');
        table.primary(['category_id', 'post_id']);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('blog_categories_posts');
};