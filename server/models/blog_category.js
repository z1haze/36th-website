const Base = require('./base');

class ArticleCategory extends Base {
    static get tableName () {
        return 'blog_categories';
    }

    static get idColumn () {
        return 'category_id';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'name'
            ],

            properties: {
                category_id: {type: 'integer'},
                name       : {type: 'string'}
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
                    from   : 'blog_categories.category_id',
                    through: {
                        from: 'blog_categories_posts.category_id',
                        to  : 'blog_categories_posts.post_id'
                    },
                    to: 'blog_posts.post_id'
                }
            }
        };
    }
}

module.exports = ArticleCategory;