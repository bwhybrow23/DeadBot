module.exports = async (bot, member) => {

    const Discord = require("discord.js");

    //CONSOLE LOG IT
    console.log(`${member.id} left the server.`);

    //FIND LEAVE CHANNEL
    let leaveChannel = bot.channels.get(bot.settings.channels.leave)
    if (!leaveChannel) return console.log("Could not log a member leaving as the server doesn't have a log channel!");

    //LEAVE EMBED
    let leaveEmbed = new Discord.RichEmbed()
        .setColor("RED")
        .setDescription(`${member.user.username} has left the dungeon! Cya around!`)
        .setFooter("User Left | Powered by Bearded Dragons", bot.user.avatarURL)
        .setTimestamp();

    //SEND LEAVE EMBED
    leaveChannel.send(leaveEmbed);

    //UPDATE MEMBER COUNT
    // member.guild.channels.find("id", "531115444090830853").setName(`Member Count: ${member.guild.memberCount}`);

}