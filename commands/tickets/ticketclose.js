module.exports = {
    name: "ticketclose",
    category: "tickets",
    description: "Close an ongoing ticket.",
    usage: ".ticketclose",
    permission: "STAFF",
    run: async (bot, message, args) => {
        
    const Discord = require("discord.js");
    const fs = require('fs')
    const eventFunctions = require(`/home/stentorian/main/functions/eventfunctions.js`);

    if (message.channel.parent.name === "Tickets") {
        if (message.channel.name.startsWith("ticket-")) {
                if (eventFunctions.checkChannel(bot.settings.channels.log, bot)) {
                    message.guild.channels.get(bot.settings.channels.log).send({
                        embed: {
                            color: bot.settings.color.yellow,
                            description: `**Ticket Closed**\n**Channel:** ${message.channel.name}\n**ID:** ${message.channel.id}`
                        }
                    })
                };
            message.channel.delete()
        } else {
          message.reply("This channel does not start with \"ticket-\". Please delete the channel manually or change the name of the channel.")
        }
    } else {
      message.reply("This channel is not in the \"Tickets\" category. Please delete the channel manually or move it to the correct category.");
    }
}};
