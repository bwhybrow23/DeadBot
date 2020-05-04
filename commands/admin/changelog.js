const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "changelog",
    category: "admin",
    description: "Handles changelogs",
    usage: "-changelog [command] [args]",
    run: async (bot, message, args) => {

        const changelogs = JSON.parse(fs.readFileSync("/home/stentorian/data/changelogs.json"));

        if (message.member.hasPermission("ADMINISTRATOR") == false) {
            return message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! You do not have permission to issue this command!`,
                    footer: {
                        "icon_url": bot.user.displayURL,
                        "text": "Changelog Command | Powered by Bearded Dragons"
                    },
                    timestamp: date
                }
            });
        };


        switch (args[0]) {

            case 'add':

                const changelog = args.slice(1).join(" ")
                changelogs.changelogs[changelogs.count] = {
                    message: changelog,
                    user: message.author.id
                };
                changelogs.count = (parseInt(changelogs.count) + 1).toString();
                fs.writeFileSync("/home/stentorian/data/changelogs.json", JSON.stringify(changelogs));
                message.channel.send("Changelog Added!")
                break;

            case 'publish':

                if (Object.getOwnPropertyNames(changelogs.changelogs).filter((s) => s != "count").length == 0) {
                    message.channel.send("Nothing to publish!");
                    return;
                }

                let toPublish = new Map();

                const embed = new Discord.RichEmbed()
                    .setTitle("Changelogs")
                    .setColor(bot.settings.color.green)

                for (const property of Object.getOwnPropertyNames(changelogs.changelogs).filter((s) => s != "count")) {
                    toPublish.set(property, {
                        message: changelogs.changelogs[property].message,
                        user: changelogs.changelogs[property].user
                    });
                    delete changelogs[property];
                }

                changelogs.count = "0";
                changelogs.changelogs = {}

                fs.writeFileSync("/home/stentorian/data/changelogs.json", JSON.stringify(changelogs));

                toPublish.forEach((v, k) => {
                    embed.addField(`Update ${parseInt(k)+1}`, `${v.message} | By: ${message.guild.members.get(v.user).toString()}`)
                });

                message.guild.channels.get(bot.settings.channels.changelogs).send(embed);
                message.channel.send("Changelogs published!")

                break;

            default:

                message.channel.send("You have input a wrong argument. Please try again with either `add` or `publish`!");
                break;
        }

    }
}