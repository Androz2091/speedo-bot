const { permissionFlags } = require('../config.json');

module.exports = {
    name: 'kick',
    description: 'Kick a user from the server.',
    args: true,
    usage: '<user> <reason>',
    guildOnly: true,
    cooldown: 15,
    aliases: ['removeMember'],
    execute(message, args) {
        const member = message.mentions.members.first();
        const user = message.mentions.users.first();
        const reason = args[1];
        const authorUser = message.author;
        const authorMember = message.guild.member(authorUser);

        if (!reason) {
            return message.channel.send('You need to supply a reason to kick a user.');
        }

        if (authorMember.hasPermission(permissionFlags[2])) {
            member.kick();
            try {
                user.send(`You were kicked by ${authorUser} for ${reason}.`);
            } catch (error) {
                console.error(`Could not send kick DM to ${user}`);
                return message.channel.send(`I couldn\'t DM ${user} the reason.`);
            }

            return message.channel.send(`${user} was successfully kicked.`);
        } else {
            return message.channel.send(`I'm sorry ${authorUser}, but you do not have permission to use this command.`);
        }
    },
};
