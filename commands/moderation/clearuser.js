module.exports = {
    name: "clearuser",
    category: "moderation",
    description: "Clear all messages from a specific user.",
    usage: "-clearuser <@user> <number of messages>",
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

    var targetuser = message.mentions.members.first();

    if (targetuser == undefined) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You need to include someone to clear the messages from.`
            }
        });
    };

    message.channel.fetchMessages({
        limit: amount,
    }).then((messages) => {
        message.delete();
        const filterBy = targetuser ? targetuser.id : bot.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    });

    message.channel.send({
        embed: {
            color: bot.settings.color.green,
            description: `Successfully cleared **${amount}** messages from **${targetuser.user.tag}**`
        }
    });



}};
