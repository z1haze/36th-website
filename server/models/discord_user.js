const Base = require('./base');

class DiscordUser extends Base {
    static get tableName () {
        return 'discord_users';
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
                'discord_discriminator',
                'is_bot',
                'join_date'
            ],

            properties: {
                discord_user_id         : {type: 'string'},
                discord_username        : {type: 'string'},
                discord_discriminator   : {type: 'string'},
                discord_nickname        : {type: ['string', 'null']},
                discord_avatar_hash     : {type: ['string', 'null']},
                age                     : {type: ['integer', 'null']},
                is_bot                  : {type: 'boolean'},
                join_date               : {type: ['string']},
                inactivity_excused_until: {type: ['string', 'null']},
                quit_timestamp          : {type: ['string', 'null']},
            }
        };
    }

    static get virtualAttributes () {
        return ['displayName'];
    }

    displayName () {
        return this.discord_nickname || this.discord_username;
    }

    static get relationMappings () {
        const DiscordRole = require('./discord_role');

        return {
            roles: {
                relation  : Base.ManyToManyRelation,
                modelClass: DiscordRole,
                join      : {
                    from   : 'discord_users.discord_user_id',
                    through: {
                        from: 'discord_roles_users.discord_user_id',
                        to  : 'discord_roles_users.discord_role_id'
                    },
                    to: 'discord_roles.discord_role_id'
                }
            }
        };
    }
}

module.exports = DiscordUser;