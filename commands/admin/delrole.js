module.exports = {
    name: "delrole",
    category: "admin",
    description: "Deletes mentioned role.",
    example: "-delrole @CoolRole",
    permission: "ADMINS",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");
        const fs = require("fs");
        var r = message.mentions.roles.first();

        if (r == undefined) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! You forgot to mention a role to remove!`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "DelRole Command | Powered by Bearded Dragons"
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
                        "text": "DelRole Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            });
        };

        var bm = message.guild.members.get(bot.user.id);

        console.log(r.position);
        console.log(bm.highestRole.position);

        if (r.position > bm.highestRole.position) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! I am unable to delete this role!`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "DelRole Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            });
        } else {
            var name = r.name;
            r.delete()
            return message.channel.send({
                embed: {
                    color: bot.settings.color.green,
                    description: `Deleted role **${name}** requested by **${message.author.tag}**`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "DelRole Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            });
        };


    }
};