const DiscordUser = require('../models/discord_user');
const DiscordRole = require('../models/discord_role');

const {sortMembers} = require('./helpers');

module.exports = {
    get: async function () {
        /**
         * Get all users in the database that have the member role
         *
         * @type {Objection.ModelObject<DiscordUser>[]}
         */
        const members = await DiscordUser.query()
            .withGraphFetched('roles')
            .whereExists(
                DiscordUser.relatedQuery('roles')
                    .where('roles.discord_role_id', process.env.MEMBER_ROLE_ID)
            )
            .then((results) => results.map((result) => result.toJSON()));

        /**
         * Get all company roles that exist in the database
         *
         * @type {DiscordRole[]}
         */
        const companyRoles = await DiscordRole.query()
            .whereIn('discord_role_id', process.env.COMPANY_ROLE_IDS.split(','));

        /**
         * Stub the roster results object
         *
         * @type {{unitLeaders: *[], companies: {}, battalionLeaders: *[]}}
         */
        const results = {
            unitLeaders     : [],
            battalionLeaders: [],
            companies       : {}
        };

        const platoonRoles = {};
        const squadRoles = {};

        for (const {discord_role_name: companyRoleName} of companyRoles) {
            if (companyRoleName.toLowerCase().includes('item')) {
                continue;
            }

            /**
             * Get the name of the company from the company name
             * @type {string}
             */
            const companyName = companyRoleName.substr(0, companyRoleName.indexOf(' '));

            /**
             * Fetch the platoon roles for the current company
             *
             * @type {DiscordRole[]}
             */
            platoonRoles[companyName.toLowerCase()] = await DiscordRole.query()
                .whereIn('discord_role_id', process.env[`${companyName.toUpperCase()}_COMPANY_PLATOON_ROLE_IDS`].split(','))
                .orderBy('discord_role_position', 'desc');

            /**
             * Fetch the squad roles for the current platoon
             *
             * @type {DiscordRole[]}
             */
            squadRoles[companyName.toLowerCase()] = await DiscordRole.query()
                .whereIn('discord_role_id', process.env[`${companyName.toUpperCase()}_COMPANY_SQUAD_ROLE_IDS`].split(','))
                .orderBy('discord_role_position', 'desc');
        }

        /**
         * Loop over each company, and stub out the leaders, platoons, and squads
         */
        for (const {discord_role_name: companyRoleName} of companyRoles) {
            if (companyRoleName.toLowerCase().includes('item')) {
                continue;
            }

            const companyName = companyRoleName.substr(0, companyRoleName.indexOf(' '));
            const currentPlatoonRoles = platoonRoles[companyName.toLowerCase()];
            const currentSquadRoles = squadRoles[companyName.toLowerCase()];

            // create the company entry
            results.companies[companyRoleName] = {
                companyLeaders: [],
                platoons      : {}
            };

            for (const {discord_role_name: platoonRoleName} of currentPlatoonRoles) {
                // create the platoon entry
                results.companies[companyRoleName].platoons[platoonRoleName] = {
                    platoonLeader  : null,
                    platoonSergeant: null,
                    squads         : {}
                };

                // actual platoon number
                const platoonNumber = platoonRoleName.match(/^\w+\s(\d)/)[1];

                // create the squad entries
                for (const {discord_role_name: squadRoleName} of currentSquadRoles) {
                    // platoon number designation in squad name
                    const squadPlatoonNumber = squadRoleName.match(/^\d\/(\d)/)[1];

                    if (platoonNumber === squadPlatoonNumber) {
                        results.companies[companyRoleName].platoons[platoonRoleName].squads[squadRoleName] = {
                            squadLeader    : null,
                            fireTeamLeaders: [],
                            squadMembers   : []
                        };
                    }
                }
            }
        }

        const unitLeadershipRoleIds = process.env.UNIT_LEADERSHIP_ROLE_IDS.split(',');
        const battalionLeadershipRoleIds = process.env.BATTALION_LEADERSHIP_ROLE_IDS.split(',');
        const rankRoleIds = process.env.RANK_ROLE_IDS.split(',');

        for (const member of members) {
            member.rankRole = member.roles.find(({discord_role_id}) => rankRoleIds.includes(discord_role_id));

            const unitLeadershipRole = member.roles.find(({discord_role_id}) => unitLeadershipRoleIds.includes(discord_role_id));

            if (unitLeadershipRole) {
                member.leadershipRole = unitLeadershipRole;
                results.unitLeaders.push(member);

                // if the member is a unit leader, we don't need to drill any further
                continue;
            }

            const battalionLeadershipRole = member.roles.find(({discord_role_id}) => battalionLeadershipRoleIds.includes(discord_role_id));

            if (battalionLeadershipRole) {
                member.leadershipRole = battalionLeadershipRole;
                results.battalionLeaders.push(member);

                // if the member is a battalion leader, we don't need to drill any further
                continue;
            }

            // everyone else _should_ have a company!
            member.companyRole = member.roles.find((r1) => companyRoles.find((r2) => r1.discord_role_id === r2.discord_role_id));

            // item company members do not need to be processed
            if (member.companyRole.discord_role_name.toLowerCase().includes('item')) {
                continue;
            }

            const companyName = member.companyRole.discord_role_name.substr(0, member.companyRole.discord_role_name.indexOf(' '));
            const companyLeadershipRoleIds = process.env[`${companyName.toUpperCase()}_COMPANY_LEADERSHIP_ROLE_IDS`].split(',');
            const companyLeadershipRole = member.roles.find(({discord_role_id}) => companyLeadershipRoleIds.includes(discord_role_id));

            if (companyLeadershipRole) {
                member.leadershipRole = companyLeadershipRole;
                results.companies[member.companyRole.discord_role_name].companyLeaders.push(member);

                continue;
            }

            const platoonRoleIds = process.env[`${companyName.toUpperCase()}_COMPANY_PLATOON_ROLE_IDS`].split(',');
            const platoonRole = member.roles.find(({discord_role_id}) => platoonRoleIds.includes(discord_role_id));

            // platoon members can be platoon leaders or platoon sergeants
            if (platoonRole) {
                member.platoon = platoonRole;

                const platoonLeaderRole = member.roles.find(({discord_role_id}) => discord_role_id === process.env[`${companyName.toUpperCase()}_COMPANY_PLATOON_LEADER_ROLE_ID`]);
                const platoonSergeantRole = member.roles.find(({discord_role_id}) => discord_role_id === process.env[`${companyName.toUpperCase()}_COMPANY_PLATOON_SERGEANT_ROLE_ID`]);

                if (platoonLeaderRole) {
                    member.leadershipRole = platoonLeaderRole;

                    results.companies[member.companyRole.discord_role_name].platoons[member.platoon.discord_role_name].platoonLeader = member;
                } else if (platoonSergeantRole) {
                    member.leadershipRole = platoonSergeantRole;

                    results.companies[member.companyRole.discord_role_name].platoons[member.platoon.discord_role_name].platoonSergeant = member;
                }

                if (platoonLeaderRole || platoonSergeantRole) {
                    continue;
                }
            }

            // otherwise member is not in company leadership and should be assigned to a squad
            const companySquadRoleIds = process.env[`${companyName.toUpperCase()}_COMPANY_SQUAD_ROLE_IDS`].split(',');
            const squadRole = member.roles.find(({discord_role_id}) => companySquadRoleIds.includes(discord_role_id));

            if (squadRole) {
                member.squad = squadRole;

                const squadLeaderRole = member.roles.find(({discord_role_id}) => discord_role_id === process.env.SQUAD_LEADER_ROLE_ID);
                const fireTeamLeaderRole = member.roles.find(({discord_role_id}) => discord_role_id === process.env.FIRE_TEAM_LEADER_ROLE_ID);

                if (squadLeaderRole) {
                    member.leadershipRole = squadLeaderRole;
                    results.companies[member.companyRole.discord_role_name].platoons[member.platoon.discord_role_name].squads[member.squad.discord_role_name].squadLeader = member;
                } else if (fireTeamLeaderRole) {
                    member.leadershipRole = fireTeamLeaderRole;
                    results.companies[member.companyRole.discord_role_name].platoons[member.platoon.discord_role_name].squads[member.squad.discord_role_name].fireTeamLeaders.push(member);
                } else {
                    results.companies[member.companyRole.discord_role_name].platoons[member.platoon.discord_role_name].squads[member.squad.discord_role_name].squadMembers.push(member);
                }
            }
        }

        for (const companyName in results.companies) {
            const company = results.companies[companyName];

            company.companyLeaders = sortMembers(company.companyLeaders, true);

            for (const platoonName in company.platoons) {
                const platoon = company.platoons[platoonName];

                for (const squadName in platoon.squads) {
                    const squad = platoon.squads[squadName];

                    // sort the squad members by rank
                    squad.squadMembers = sortMembers(squad.squadMembers);
                }
            }
        }

        /**
         * Sort the leadership by position first, followed by rank
         */

        results.unitLeaders = sortMembers(results.unitLeaders, true);
        results.battalionLeaders = sortMembers(results.battalionLeaders, true);

        /**
         * Purge any empty unit elements, eg empty squads, platoons
         */
        for (const ckey in results.companies) {
            const company = results.companies[ckey];

            for (const pkey in results.companies[ckey].platoons) {
                const platoon = company.platoons[pkey];

                for (const skey in platoon.squads) {
                    const squad = platoon.squads[skey];

                    if (squad.squadLeader) {
                        continue;
                    }

                    if (squad.fireTeamLeaders.length) {
                        continue;
                    }

                    if (squad.squadMembers.length) {
                        continue;
                    }

                    delete platoon.squads[skey];
                }

                // if the squad is empty, remove it
                if (Object.keys(platoon.squads).length === 0) {
                    delete platoon.squads;

                    // if the platoon is empty, remove it
                    if (!platoon.platoonLeader && !platoon.platoonSergeant) {
                        delete results.companies[ckey].platoons[pkey];
                    }
                }
            }
        }

        return results;
    }
};