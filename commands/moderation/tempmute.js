module.exports = {
    name: "tempmute",
    category: "moderation",
    description: "Temporarily mute someone from talking in chat.",
    usage: "-tempmute <@user> <time> <reason>",
    permission: "STAFF",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const fs = require("fs");
   
    if (!message.member.hasPermission("BAN_MEMBERS")) {
        return message.channel.send({
            embed: {
                color: bot.settings.color.red,
                description: `Error! You do not have permission to do that!`
            }
        });
    };
   
    var targetuser = message.mentions.members.first();
   
    if (targetuser == undefined) {
     return message.channel.send({
      embed: {
       color: bot.settings.color.red,
       description: `Error! You forgot to mention a user!`
      }
     });
   
    };
   
    var reason = args.slice(2).join(" ");
   
    if (reason.length < 1) {
     return message.channel.send({
      embed: {
       color: bot.settings.color.red,
       description: `Error! You forgot to include a reason!`
      }
     });
    };
   
    var time = args[1];
    if (time == undefined) {
     return message.channel.send({
      embed: {
       color: bot.settings.color.red,
       description: `Error! You forgot to include a time in the minutes!`
      }
     });
    };
   
    if (isNaN(time)) {
     return message.channel.send({
      embed: {
       color: bot.settings.color.red,
       description: `Error! The time has to a number.`
      }
     });
    };
   
    if (time < 1) {
     return message.channel.send({
      embed: {
       color: bot.settings.color.red,
       description: `Error! The time has to be bigger that **1 minute**!`
      }
     });
    };
   
    if (time > 1440) {
     return message.channel.send({
      embed: {
       color: bot.settings.color.red,
       description: `Error! The time cannot be longer than **1 day**!`
      }
     });
    };
   
    if (targetuser.hasPermission("ADMINISTRATOR")) {
     return message.channel.send({
      embed: {
       color: bot.settings.color.red,
       description: `Error! That user is an admin!`
      }
     });
    };
   
    let muterole = message.guild.roles.find(`name`, `Mute`);
    let botasmember = message.guild.members.get(bot.user.id);
   
   
   
    if (muterole == undefined) {
   
     message.guild.createRole({
      name: `Mute`,
      reason: `StenBot Mute Role Auto-create`
     }).then(role => {
      message.guild.channels.forEach(function(channel) {
       channel.overwritePermissions(role, {
        SEND_MESSAGES: false
       });
       let muterole = role;
      });
   
      role.setPosition(botasmember.highestRole.position - 1);
   
   
     });
    };
   
    if (targetuser.roles.has(muterole.id) == true) {
     return message.channel.send({
      embed: {
       color: bot.settings.color.red,
       description: `Error! That user is already muted!`
      }
     });
    };
   
    targetuser.addRole(muterole.id);
   
    message.channel.send({
     embed: {
      color: bot.settings.color.green,
      description: `Successfully muted **${targetuser.user.tag}** for **${time}** minutes.`
     }
    })
   
    let ms = time * 60 * 1000;
   
    bot.setTimeout(function() {
     targetuser.removeRole(muterole.id);
   
    }, ms);
   
   }};
