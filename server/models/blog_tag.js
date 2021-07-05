const Base = require('./base');

class BlogTag extends Base {
    static get tableName () {
        return 'blog_tags';
    }

    static get idColumn () {
        return 'tag_id';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'name'
            ],

            properties: {
                tag_id: {type: 'integer'},
                name  : {type: 'string'}
            }
        };
    }

    static get relationMappings () {
        const BlogPost = require('./blog_post');

        return {
            blogPosts: {
                relation  : Base.ManyToManyRelation,
                modelClass: BlogPost,
                join      : {
                    from   : 'blog_tags.tag_id',
                    through: {
                        from: 'blog_tags_posts.tag_id',
                        to  : 'blog_tags_posts.post_id'
                    },
                    to: 'blog_posts.post_id'
                }
            }
        };
    }
}

module.exports = BlogTag;