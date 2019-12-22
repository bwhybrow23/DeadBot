module.exports = {
    name: "server",
    category: "bot",
    description: "Gain information about the server the command is ran in..",
    usage: "-server",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");

    let sicon = message.guild.iconURL;
   
    let channelcount = message.guild.channels.size;
    let gcreated = message.guild.createdAt;
    let gid = message.guild.id;
    let totalmembers = message.guild.memberCount;
    let gname = message.guild.name;
    let rolecount = message.guild.roles.size;

    const serverEmbed = new Discord.RichEmbed()
        .setColor(bot.settings.color.green)
        .setThumbnail(sicon)
        .setDescription('**' + gname + ' Information**\n\nGuild Id **' + gid + '**\nGuild Channels: **' + channelcount + '**\nCreated: **' + gcreated + '**\nTotal Members: **' + totalmembers + '**\nTotal Roles: **' + rolecount + '**')
        .setFooter("Server Command | Powered by Bearded Dragons", bot.user.displayURL)
        .setTimestamp();

    message.channel.send(serverEmbed);
   
   }};
