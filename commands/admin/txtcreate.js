module.exports = {
    name: "txtcreate",
    category: "admin",
    description: "Create a text channel.",
    example: "-txtcreate cool-channel",
    permission: "ADMINS",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");

        var n = args[0];


        if (n == undefined) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! You forgot to include a name for the channel!`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "TxtCreate Command | Powered by Bearded Dragons"
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
                        "text": "TxtCreate Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            });
        };

        var t = args.slice(1).join(" ") || "None";

        if (n.length > 100) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `The channel name has to be between 1 and 100 in **length**`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "TxtCreate Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            })
        };

        if (t.length > 1024) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `The channel topic has to be less that 1024  characters.`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "TxtCreate Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            })
        };

        message.guild.createChannel(`${n}`, "text").then(channel => {
            channel.setTopic(`${t}`);
            message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `The channel **${channel.name}** has been created.`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "TxtCreate Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            });
        });
    }
};