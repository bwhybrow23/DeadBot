module.exports = {
    name: "vccreate",
    category: "admin",
    description: "Create a voice channel.",
    usage: "-vccreate <channel name>",
    permission: "ADMINS",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");

        var n = args.slice(0).join(" ");


        if (n.length < 1) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! You forgot to include a name for the channel!`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "VcCreate Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
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
                        "text": "VcCreate Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            });
        };

        if (n.length > 100) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `The voice channel name has to be between 1 and 100 in **length**`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "VcCreate Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            })
        };

        message.guild.createChannel(`${n}`, "voice").then(channel => {
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `The voice channel **${channel.name}** has been created.`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "VcCreate Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            });
        });
    }
};