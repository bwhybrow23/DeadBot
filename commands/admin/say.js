module.exports = {
    name: "say",
    category: "admin",
    description: "Gets the bot to say something in an embed.",
    usage: "-say <message>",
    permission: "ADMINS",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");
        const adminperm = message.member.hasPermission("ADMINISTRATOR");


        var access = true;

        if (adminperm == false) {
            var access = false;
        } else if (adminperm == true) {
            var access = true;
        }

        if (access == false) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! You are not the owner or an admin!`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "Say Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            });
        };

        var msg = args.slice(0).join(" ");
        if (msg.length > 500) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! Your message it too long. It must be less that **500** characters.`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "Say Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            })
        };
        if (msg.length < 2) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! Your message is too short.`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "Say Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            })
        };

        message.channel.send({
            embed: {
                color: bot.settings.color.green,
                description: `${msg}`,
                footer: {
                    "icon_url": bot.user.displayURL,
                    "text": "Say Command | Powered by Bearded Dragons"
                },
                timestamp: date
            }
        });
        message.delete();
    }
};