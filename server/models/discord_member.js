const Base = require('./base');

class DiscordMember extends Base {
    static get tableName () {
        return 'discord_members';
    }

    static get idColumn () {
        return 'discord_user_id';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'discord_user_id',
                'discord_username'
            ],

            properties: {
                discord_user_id : {type: 'string'},
                discord_username: {type: 'string'}
            }
        };
    }

    static get relationMappings () {
        const UnitMember = require('./unit_member');

        return {
            unitMember: {
                relation  : Base.HasOneRelation,
                modelClass: UnitMember,
                join      : {
                    from: 'discord_members.discord_user_id',
                    to  : 'unit_members.discord_user_id',
                }
            },
        };
    }
}

module.exports = DiscordMember;