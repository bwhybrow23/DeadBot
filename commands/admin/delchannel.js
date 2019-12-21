module.exports = {
    name: "delchannel",
    category: "admin",
    description: "Deletes mentioned channel.",
    example: "-delchannel #dead-channel",
    permission: "ADMINS",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");
        const fs = require("fs");
        var c = message.mentions.channels.first();

        let date = new Date;

        if (c == undefined) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! You forgot to mention a channel to remove!`
                }
            });
        };

        if (message.member.hasPermission("ADMINISTRATOR") == false) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! You do not have permission to issue this command!`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "DelChannel Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            });
        };



        if (c.deletable == false) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! I am unable to delete that channel!`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "DelChannel Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            });
        };

        c.delete().then(deleted =>
            message.channel.send({
                embed: {
                    color: bot.settings.color.yellow,
                    description: `The channel **${deleted.name}** has been deleted by ${message.author}`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "DelChannel Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            })
        );
    }
};