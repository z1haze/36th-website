const DiscordMember = require('../models/discord_member');

module.exports = async (discordUserId) => {
    const discordMember = await DiscordMember.query()
        .withGraphFetched('[unitMember]')
        .findById(discordUserId);

    if (!discordMember) {
        return false;
    }

    if (discordMember.unitMember) {
        return false;
    }

    return true;
};