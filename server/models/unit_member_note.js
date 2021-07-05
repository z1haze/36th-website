const Base = require('./base');

class UnitMemberNote extends Base {
    static get tableName () {
        return 'unit_member_notes';
    }

    static get idColumn () {
        return 'note_id';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'member_discord_user_id',
                'author_discord_user_id',
                'content'
            ],

            properties: {
                note_id               : {type: 'integer'},
                member_discord_user_id: {type: 'string'},
                author_discord_user_id: {type: 'string'},
                content               : {type: 'text'}
            }
        };
    }

    static get relationMappings () {
        const UnitMember = require('./unit_member');

        return {
            member: {
                relation  : Base.BelongsToOneRelation,
                modelClass: UnitMember,
                join      : {
                    from: 'unit_member_notes.member_discord_user_id',
                    to  : 'unit_members.discord_user_id'
                }
            },

            author: {
                relation  : Base.BelongsToOneRelation,
                modelClass: UnitMember,
                join      : {
                    from: 'unit_member_notes.author_discord_user_id',
                    to  : 'unit_members.discord_user_id'
                }
            }
        };
    }
}

module.exports = UnitMemberNote;