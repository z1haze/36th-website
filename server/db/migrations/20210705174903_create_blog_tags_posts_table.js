exports.up = function (knex) {
    return knex.schema.createTable('blog_tags_posts', function (table) {
        table.increments('tag_id');
        table.string('post_id');
        table.primary(['tag_id', 'post_id']);
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('blog_tags_posts');
};