module.exports = {
    name: "ticket",
    category: "tickets",
    description: "Create a ticket to speak to Staff",
    usage: "-ticket <reason>",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");

    var reason = args.slice(0).join(" ");
    var format = require("string-template");
    var tnum = Math.floor(Math.random() * 1000001);
    //var staffroleobj = message.guild.roles.get(config.staffrole);

    function errsend(msg) {
        message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! ${msg}`
            }
        });
    };

    //Check if supplied sufficient reason
    if (reason.length < 1) {
        return errsend("Make sure you include a reason for creating this ticket.")
    };
    if (reason.length > 200) {
        return errsend("Your reason is too long! Make sure its less than **200** characters.")
    };

    //Check for a category called tickets, if it does not exist create one
    function isCatTickets(element) {
        if (element.constructor.name != "CategoryChannel") {
            return false
        };
        if (element.name != "Tickets") {
            return false
        };
        return true;
    };
    if (!message.guild.channels.some(isCatTickets)) {
        message.guild.createChannel("Tickets", "category");

        message.reply("An error occured. Please try again.");
    };

    //Create channel into ticket category

    function createChan(element) {
        if (element.constructor.name == "CategoryChannel") {
            if (element.name == "Tickets") {
                message.guild.createChannel(`ticket-${tnum}`, "text").then(channel => {
                    channel.setParent(element.id);
                    channel.setTopic("Ticket");

                    //Remove everyone from the channel:
                    channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: false,
                        READ_MESSAGES: false
                    });
                    channel.overwritePermissions(message.guild.roles.get(bot.settings.roles.staffRole), {
                        SEND_MESSAGES: true,
                        READ_MESSAGES: true,
                        MANAGE_MESSAGES: true
                    });
                    channel.overwritePermissions(message.author, {
                        SEND_MESSAGES: true,
                        READ_MESSAGES: true,
                        MANAGE_MESSAGES: true
                    });

                    //Send Ticket Embed
                    var tMessage = [];
                    let newTicketEmbed = new Discord.RichEmbed()
                    .setColor(bot.settings.color.blue)
                    .setTitle("New Ticket")
                    .setDescription(`Thank you for creating a ticket. A staff member will be with you soon!`)
                    .addField("User", message.author.tag)
                    .addField("Reason", reason)
                    .setFooter("New Ticket | Powered by Bearded Dragons", bot.user.displayURL)

                    tMessage.push(newTicketEmbed)

                    channel.send(newTicketEmbed);
                    channel.send("<@&657662291818315786>")
                    message.channel.send({
                        embed: {
                            color: bot.settings.color.green,
                            description: `Your ticket ${channel} has been created, ${message.member.displayName}`
                        }
                    });

                    //Check if logging enabled
                    var checkChannel = (id) => {
                        let tchannel = bot.channels.get(id);
                        if (tchannel == undefined) {
                            return false;
                        } else {
                            return true;
                        };
                    };

                        if (checkChannel(bot.settings.channels.log)) {
                            message.guild.channels.get(bot.settings.channels.log).send({
                                embed: {
                                    color: bot.settings.color.yellow,
                                    description: `**Ticket Created**\n**Created By:** ${message.author.tag}\n**Channel:** ${channel.name}\n**Id:** ${channel.id}\n\n**Reason:** ${reason}`
                                }
                            });
                    };
                });
            }
        }
    };
    createChan(message.guild.channels.some(createChan)); //Run the beast




}};
