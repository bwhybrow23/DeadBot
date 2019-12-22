module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kick a user from your server.",
    usage: "-kick <@user> <reason>",
    permission: "STAFF",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");

    if (!message.member.roles.has(bot.settings.roles.staffRole)) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You do not have permission to do that!`
            }
        });
    };

    var targetuser = message.mentions.members.first();

    if (targetuser == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You forgot to mention a user!`
            }
        });

    };

    var reason = args.slice(1).join(" ");

    if (reason.length < 1) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You forgot to include a reason!`
            }
        });
    };

    if (!targetuser.kickable) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! I am unable to kick this user.`
            }
        });
    };



    targetuser.kick(`By ${message.author.id}`);

    message.channel.send({
        embed: {
            color: bot.settings.color.green,
            description: `Successfully kicked **${targetuser.user.tag}** for **${reason}**`
        }
    });

}};
