module.exports = async (bot, message) => {

    const Discord = require("discord.js");

    if (message.author.bot) return;

    const logs = bot.channels.get(bot.settings.channels.log);
  
    let deleteMSGEmbed = new Discord.RichEmbed()
    .setColor("#ff00e1")
    .setThumbnail(message.author.displayAvatarURL)
    .setAuthor(message.author.tag)
    .setDescription(`**Message Deleted in <#${message.channel.id}>**`)
    .addField("Message:", message.content)
    .setFooter("Message Deleted | Powered by Bearded Dragons", bot.user.avatarURL)
    .setTimestamp();
  
    logs.send(deleteMSGEmbed);

};