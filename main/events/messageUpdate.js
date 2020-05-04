module.exports = async (bot, oldMessage, newMessage) => {

    const Discord = require("discord.js");

    if (oldMessage.author.bot || newMessage.author.bot) return;
    if (!oldMessage || !newMessage) return;

    const logs = bot.channels.get(bot.settings.channels.log);

    let editMSGEmbed = new Discord.RichEmbed()
        .setColor("#ff00e1")
        .setThumbnail(oldMessage.author.displayAvatarURL)
        .setAuthor(oldMessage.author.tag)
        .setDescription(`**Message Edited in <#${newMessage.channel.id}>**`)
        .addField("Before:", oldMessage.content)
        .addField("After:", newMessage.content)
        .setFooter("Message Edited | Powered by Bearded Dragons", bot.user.avatarURL)
        .setTimestamp();

    logs.send(editMSGEmbed);

}