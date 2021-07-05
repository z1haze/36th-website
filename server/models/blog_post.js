const Base = require('./base');

class BlogPost extends Base {
    static get tableName () {
        return 'blog_posts';
    }

    static get idColumn () {
        return 'post_id';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'discord_user_id',
                'title',
                'body',
            ],

            properties: {
                post_id        : {type: 'integer'},
                discord_user_id: {type: 'string'},
                title          : {type: 'string'},
                body           : {type: 'string'},
                published_on   : {type: 'string'}
            }
        };
    }

    static get relationMappings () {
        const BlogCategory = require('./blog_category');
        const BlogTag = require('./blog_tag');
        const UnitMember = require('./unit_member');

        return {
            author: {
                relation  : Base.BelongsToOneRelation,
                modelClass: UnitMember,
                join      : {
                    from: 'blog_posts.discord_user_id',
                    to  : 'unit_members.discord_user_id'
                }
            },

            categories: {
                relation  : Base.ManyToManyRelation,
                modelClass: BlogCategory,
                join      : {
                    from   : 'blog_posts.post_id',
                    through: {
                        from: 'blog_categories_posts.post_id',
                        to  : 'blog_categories_posts.category_id'
                    },
                    to: 'blog_categories.category_id'
                }
            },

            tags: {
                relation  : Base.ManyToManyRelation,
                modelClass: BlogTag,
                join      : {
                    from   : 'blog_posts.post_id',
                    through: {
                        from: 'blog_tags_posts.post_id',
                        to  : 'blog_tags_posts.tag_id'
                    },
                    to: 'blog_tags.tag_id'
                }
            },

        };
    }
}

module.exports = BlogPost;