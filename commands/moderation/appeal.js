module.exports = {
    name: "appeal",
    category: "moderation",
    description: "Appeal a punishment on the Minecraft server.",
    usage: "-appeal",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");
        const eventFunctions = require(`../../main/functions/eventfunctions.js`);

        switch (args[0]) {

            case 'accept':

                var person = message.mentions.members.first();

                if (person == undefined) {
                    return message.channel.send({
                        embed: {
                            color: bot.settings.color.red,
                            description: `Error! You forgot to mention a user!`
                        }
                    });
                };

                if (message.channel.parent.name === "Appeals") {
                    if (message.channel.name.startsWith("appeal-")) {

                        //DM Embed
                        let acceptEmbed = new Discord.RichEmbed()
                            .setColor(bot.settings.color.green)
                            .setTitle("Appeal Accepted")
                            .setDescription("Your punishment appeal has been accepted and in the next few minutes, your punishment will be revoked. Have fun playing on PicselCraft!")
                            .setFooter("Accepted Appeal | Powered by Bearded Dragons", bot.user.displayURL);

                        person.send(acceptEmbed);

                        //Log Appeal Accepted
                        if (eventFunctions.checkChannel(bot.settings.channels.log, bot)) {
                            message.guild.channels.get(bot.settings.channels.log).send({
                                embed: {
                                    color: bot.settings.color.yellow,
                                    description: `**Appeal Accepted**\n**Accepted By:** ${message.author.tag}\n**User:** ${person.tag}\n**Channel:** ${message.channel.name}\n**Id:** ${message.channel.id}`
                                }
                            });
                        };

                        //Delete the Channel
                        message.channel.delete();

                    } else {
                        message.reply("This channel does not start with \"appeal-\". Please run this command in an appeal channel.")
                    }
                } else {
                    message.reply("This channel is not in the \"Appeals\" category. Please run this command in an appeal channel.")
                }

                break;

            case 'deny':

                var person = message.mentions.members.first();

                if (person == undefined) {
                    return message.channel.send({
                        embed: {
                            color: bot.settings.color.red,
                            description: `Error! You forgot to mention a user!`
                        }
                    });
                };

                var reason = args.slice(2).join(" ");

                if (!reason) {
                    return message.channel.send({
                        embed: {
                            color: bot.settings.color.red,
                            description: `Error! You haven't included a reason for denial.`
                        }
                    });
                };

                if (message.channel.parent.name === "Appeals") {
                    if (message.channel.name.startsWith("appeal-")) {

                        //DM Embed
                        let denyEmbed = new Discord.RichEmbed()
                            .setColor(bot.settings.color.red)
                            .setTitle("Appeal Denied")
                            .setDescription("Your punishment appeal has been denied. The reason has been stated below. You can appeal this punishment once more in 7 days. After that period, your appeals will be instantly denied and may result in a mute or ban from the Discord server.")
                            .addField("Reason for Denial", reason)
                            .setFooter("Denied Appeal | Powered by Bearded Dragons", bot.user.displayURL);

                        person.send(denyEmbed);

                        //Log Appeal Denied
                        if (eventFunctions.checkChannel(bot.settings.channels.log, bot)) {
                            message.guild.channels.get(bot.settings.channels.log).send({
                                embed: {
                                    color: bot.settings.color.yellow,
                                    description: `**Appeal Denied**\n**Denied By:** ${message.author.tag}\n**Reason:**${reason}\n**User:** ${person.tag}\n**Channel:** ${message.channel.name}\n**Id:** ${message.channel.id}`
                                }
                            });
                        };

                        //Delete the Channel
                        message.channel.delete();

                    } else {
                        message.reply("This channel does not start with \"appeal-\". Please run this command in an appeal channel.")
                    }
                } else {
                    message.reply("This channel is not in the \"Appeals\" category. Please run this command in an appeal channel.")
                }

                break;
            default:

                //Check for appeals category
                function isCatAppeals(element) {
                    if (element.constructor.name != "CategoryChannel") {
                        return false
                    };
                    if (element.name != "Appeals") {
                        return false
                    };
                    return true
                };
                if (!message.guild.channels.some(isCatAppeals)) {
                    message.guild.createChannel("Appeals", "category");

                    message.reply("An error occured. Please try again.");
                };

                //Create channel in category

                function createChan(element) {
                    if (element.constructor.name == "CategoryChannel") {
                        if (element.name == "Appeals") {
                            message.guild.createChannel(`appeal-${message.author.tag}`, "text").then(channel => {
                                channel.setParent(element.id);
                                channel.setTopic("Appeals");

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
                                let newAppealEmbed = new Discord.RichEmbed()
                                    .setColor(bot.settings.color.blue)
                                    .setTitle("New Appeal")
                                    .setDescription(`Thank you for creating an appeal. The appeal format is listed below. Please fill this out in as much detail as possible and a staff member will respond to it once done.`)
                                    .addField("User", message.author.tag)
                                    .setFooter("New Appeal | Powered by Bearded Dragons", bot.user.displayURL);

                                let appealInfoEmbed = new Discord.RichEmbed()
                                    .setColor(bot.settings.color.blue)
                                    .setTitle("Appeal Questions")
                                    .setDescription(`Here are the list of questions in order for us to quickly accept your appeal. Please fill them out with the correct and in-depth information in order for your appeal to be correctly judged.\n1. What is your IGN?\n2. Who were you punished by?\n3. What was the reason for your punishment?\n4. What is the date of your punishment?\n5. Why should the punishment be revoked?\n6. Can you please provide a screenshot of the punishment screen that you get when attempting to join the server.\n7. Please provide any relevant screenshots or videos in order to assist us.`)
                                    .setFooter("Appeal Information | Powered by Bearded Dragons", bot.user.displayURL);

                                channel.send("<@&706850061618905088>").then(channel.send(newAppealEmbed)).then(channel.send(appealInfoEmbed));

                                message.channel.send({
                                    embed: {
                                        color: bot.settings.color.green,
                                        description: `Your appeal ${channel} has been created, ${message.member.displayName}`
                                    }
                                });
                            })
                        }
                    }
                };

                createChan(message.guild.channels.some(createChan)); //Run the beast

                //Log Appeal Creation
                if (eventFunctions.checkChannel(bot.settings.channels.log, bot)) {
                    message.guild.channels.get(bot.settings.channels.log).send({
                        embed: {
                            color: bot.settings.color.yellow,
                            description: `**Appeal Created**\n**Created By:** ${message.author.tag}\n**Channel:** ${message.channel.name}\n**Id:** ${message.channel.id}`
                        }
                    });
                };

                break;

        }

    }
}