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
    if(message.channel.parent.name !== "Tickets") {
        return errsend("The channel is not in the tickets category.")
    };

    //add user
    let toBeAdded = message.mentions.members.first();
    try{channel.overwritePermissions(toBeAdded.id, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
    });
    } catch(e) {
        return errsend("Error in adding this user. Please check the console.")
        console.log('[SYSTEM]'.grey, e);
    };
    
    let embed = new Discord.RichEmbed()
    .setColor(bot.setting.green)
    .setDescription(`The user ${toBeAdded.tag} has been added to the ticket.`)
    .setAuthor(message.author.tag, message.author.displayURL)
    .setTimestamp();

    message.channel.send(embed);

}};
