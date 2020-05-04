module.exports = {
    name: "clear",
    category: "moderation",
    description: "Clear a certain amount of messages from chat.",
    usage: "-clear <number of messages>",
    permission: "STAFF",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You do not have permission to do that!`
            }
        });
    };


    var amount = args[0];
    if (amount == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You didn't include an amount of messages to clear!`
            }
        });
    };

    if (isNaN(amount)) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! The amount of messages you are clearing needs to be a number!`
            }
        });
    };


    if (amount > 100) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You cant clear more than 100 messsages at a time!`
            }
        });
    };

    if (amount < 1) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You cant clear less than 1 message!`
            }
        });
    };

    message.channel.fetchMessages({
        limit: amount,
    }).then((messages) => {
        message.delete();
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });

    message.channel.send({
        embed: {
            color: bot.settings.color.green,
            description: `Successfully cleared **${amount}** messages in **${message.channel.name}**`
        }
    });



}};
