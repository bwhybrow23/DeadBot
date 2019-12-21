module.exports = async (bot, member) => {

    const Discord = require("discord.js");

    //CONSOLE LOG IT
    console.log(`${member.id} has joined the server.`);

    //FIND THE WELCOME CHANNEL
    let welcomeChannel = bot.channels.get(bot.settings.channels.welcome);
    if (!welcomeChannel) return console.log("Could not log a member joining as the server doesn't have a log channel!");

    //WELCOME EMBED
    let welcomeEmbed = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(`Welcome ${member} to ${member.guild.name}! \n Please make sure to read the rules carefully and introduce yourself in General! We're all friendly here!`)
        .setFooter("User Joined | Powered by Bearded Dragons", bot.user.avatarURL)
        .setTimestamp();

    //SEND THAT WELCOME EMBED TO THE WELCOME CHANNEL
    welcomeChannel.send(welcomeEmbed);

    //UPDATE CHANNEL NAME WITH NEW MEMBER COUNT
    //member.guild.channels.find("id", "538059121363124224").setName(`Member Count: ${member.guild.memberCount}`);

    //ADD ROLE(S) TO USER
    let memberRole = member.guild.roles.find("name", "Member");
    member.addRole(memberRole).catch(console.error);

}