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
    let memberRole = member.guild.roles.find("id", "657662299829698561");
    member.addRole(memberRole).catch(console.error);

    let spacerRole1 = member.guild.roles.find("id", "659154399742001152");
    member.addRole(spacerRole1).catch(console.error);

    let spacerRole2 = member.guild.roles.find("id", "659155152988536843");
    member.addRole(spacerRole2).catch(console.error);

    let spacerRole3 = member.guild.roles.find("id", "659154612577763359");
    member.addRole(spacerRole3).catch(console.error); 

    let spacerRole4 = member.guild.roles.find("id", "659158292391526425");
    member.addRole(spacerRole4).catch(console.error); 

}