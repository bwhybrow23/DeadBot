module.exports = {
    name: "tadd",
    category: "tickets",
    description: "Add a user to an ongoing ticket.",
    usage: "-tadd <@user>",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");
        const fs = require("fs");

        function errsend(msg) {
            message.channel.send({
                embed: {
                    color: bot.settings.color.red,
                    description: `Error! ${msg}`
                }
            });
        };

        //if channel is in ticket cat
        if (message.channel.parent.name !== "Tickets") {
            return errsend("The channel is not in the tickets category.")
        };

        //add user
        let toBeAdded = message.mentions.members.first();
        try {
            message.channel.overwritePermissions(toBeAdded.id, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
        } catch (e) {
            // return errsend("Error in adding this user. Please check the console.")
            return errsend(e);
            console.log(e);
        };

        let embed = new Discord.RichEmbed()
            .setColor(bot.settings.color.green)
            .setDescription(`The user <@${toBeAdded.user.id}> has been added to the ticket as per requested by <@${message.author.id}>`)
            .setAuthor(message.author.tag, message.author.displayURL)
            .setTimestamp();

        function messageSend1() {
            // happens first
            message.channel.send(embed);
        }

        function messageSend2() {
            // happens second
            message.channel.send(`Welcome to the ticket <@${toBeAdded.user.id}>!`);
        }

        // call the first one right away
        messageSend1();

        // executes the second one after a second
        setTimeout(messageSend2, 1000);

    }
};