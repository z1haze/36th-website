const Base = require('./base');

class DiscordRole extends Base {
    static get tableName () {
        return 'discord_roles';
    }

    static get idColumn () {
        return 'discord_role_id';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'discord_role_id',
                'discord_role_name',
                'discord_role_position'
            ],

            properties: {
                discord_role_id      : {type: 'string'},
                discord_role_name    : {type: 'string'},
                discord_role_position: {type: 'number'},
            }
        };
    }

    static get relationMappings () {
        const DiscordUser = require('./discord_user');

        return {
            users: {
                relation  : Base.ManyToManyRelation,
                modelClass: DiscordUser,
                join      : {
                    from   : 'roles.discord_role_id',
                    through: {
                        from: 'roles_users.discord_role_id',
                        to  : 'roles_users.discord_user_id',
                    },
                    to: 'users.discord_user_id',
                }
            },
        };
    }
}

module.exports = DiscordRole;