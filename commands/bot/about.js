module.exports = {
    name: "about",
    category: "bot",
    description: "Gives all the information about the bot.",
    example: "-about",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    //const settings = require('../main/settings.json');
    const Discord = require("discord.js");

    let userimage = message.author.avatarURL;
    let usertag = message.author.tag;

    let aboutEmbed = new Discord.RichEmbed()
        .setThumbnail(bot.user.displayAvatarURL)
        .setColor(bot.settings.color.blue)
        .setTitle('Bot Information')
        .addField('Bot Name', bot.user.tag)
        .addField('Founded By', '[Stentorian#9524](https://twitter.com/stentorianyt)')
        .addField('Created On', bot.user.createdAt)
        .addField('Made For', "[DeadPicsel](https://twitch.tv/deadpicsel)")
        .setFooter(`About Command | Powered by Bearded Dragons`, bot.user.displayURL)
        .setTimestamp();

    message.channel.send(aboutEmbed);

}};
