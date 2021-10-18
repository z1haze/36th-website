function sortMembers (arr, roleSort = false) {
    return arr.sort((a, b) => {
        let diff = 0;

        if (roleSort) {
            diff = b.leadershipRole.discord_role_position - a.leadershipRole.discord_role_position;
        }

        if (diff === 0) {
            diff = b.rankRole.discord_role_position - a.rankRole.discord_role_position;
        }

        return diff;
    });

}

module.exports = {
    sortMembers
};