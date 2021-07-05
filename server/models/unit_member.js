const Base = require('./base');

class Member extends Base {
    static get tableName () {
        return 'unit_members';
    }

    static get idColumn () {
        return 'discord_user_id';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'discord_user_id',
                'discord_username',
                'discord_nickname',
                'join_date'
            ],

            properties: {
                discord_user_id      : {type: 'string'},
                discord_username     : {type: 'string'},
                discord_discriminator: {type: 'string'},
                discord_nickname     : {type: ['string', 'null']},
                discord_avatar_hash  : {type: ['string', 'null']},
                join_date            : {type: 'string'},
                is_active            : {type: 'boolean', default: true}
            }
        };
    }

    static get relationMappings () {
        const UnitApplication = require('./unit_application');
        const BlogPost = require('./blog_post');

        return {
            applications: {
                relation  : Base.HasManyRelation,
                modelClass: UnitApplication,
                join      : {
                    from: 'unit_members.discord_user_id',
                    to  : 'unit_applications.discord_user_id'
                }
            },

            blogPosts: {
                relation  : Base.HasManyRelation,
                modelClass: BlogPost,
                join      : {
                    from: 'unit_members.discord_user_id',
                    to  : 'blog_posts.discord_user_id'
                }
            },
        };
    }
}

module.exports = Member;