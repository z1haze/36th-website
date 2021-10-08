exports.up = function (knex) {
    return knex.schema.createTable('blog_posts', function (table) {
        table.increments('post_id').primary();
        table.string('discord_user_id');
        table.string('title');
        table.string('slug');
        table.string('main_image');
        table.text('body');
        table.timestamp('published_on');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('blog_posts');
};
