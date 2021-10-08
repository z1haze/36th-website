const DiscordMember = require('../models/discord_member');

module.exports = async (discordUserId) => {
    const discordMember = await DiscordMember.query()
        .withGraphFetched('[unitMember]')
        .findById(discordUserId);

    // a user cannot apply if they are not a member of the discord
    if (!discordMember) {
        return false;
    }

    // an existing unit member cannot apply
    if (discordMember.unitMember) {
        return false;
    }

    // pending application check
    // previously rejected application check

    return true;
};