module.exports = async (bot, message, omsg, nmsg) => {

    const Discord = require("discord.js");

    if (omsg.author.bot || nmsg.author.bot) return;
    if (!omsg || !nmsg) return;

    const logs = bot.channels.get(bot.settings.channels.log);

    let editMSGEmbed = new Discord.RichEmbed()
        .setColor("#ff00e1")
        .setThumbnail(nmsg.author.displayAvatarURL)
        .setAuthor(nmsg.author.tag)
        .setDescription(`**Message Edited in <#${nmsg.channel.id}>**`)
        .addField("Before:", omsg.content)
        .addField("After:", nmsg.content)
        .setFooter("Message Edited | Powered by Bearded Dragons", bot.user.avatarURL)
        .setTimestamp();

    logs.send(editMSGEmbed);

}