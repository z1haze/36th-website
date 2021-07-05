const Base = require('./base');

class Application extends Base {
    static get tableName () {
        return 'unit_applications';
    }

    static get idColumn () {
        return 'application_id';
    }

    static get jsonSchema () {
        return {
            type    : 'object',
            required: [
                'discord_user_id',
                'content'
            ],

            properties: {
                application_id : {type: 'integer'},
                discord_user_id: {type: 'string'},
                content        : {type: 'object'},
                state          : {
                    type   : 'string',
                    enum   : ['IN VOTING', 'ACCEPTED', 'DENIED', 'ON HOLD'],
                    default: 'IN VOTING'
                }
            }
        };
    }

    static get relationMappings () {
        const UnitMember = require('./unit_member');

        return {
            applicant: {
                relation  : Base.BelongsToOneRelation,
                modelClass: UnitMember,
                join      : {
                    from: 'unit_applications.applicant_user_id',
                    to  : 'unit_members.discord_user_id'
                }
            },

            voters: {
                relation  : Base.ManyToManyRelation,
                modelClass: UnitMember,
                join      : {
                    from   : 'unit_applications.application_id',
                    through: {
                        from : 'unit_application_votes.application_id',
                        to   : 'unit_application_votes.discord_user_id',
                        extra: ['is_upvote'],
                    },
                    to: 'unit_members.discord_user_id',
                }
            },
        };
    }
}

module.exports = Application;