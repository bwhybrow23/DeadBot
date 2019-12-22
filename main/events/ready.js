module.exports = async (bot) => {

    const Discord = require("discord.js");

    const utils = require("../functions/utilities.js");

    //CONSOLE LOG IT BEING TURNED ON
    let date = new Date;
    // console.log('[SYSTEM]'.grey, `${bot.name} Has Started Successfully. Version: ${bot.settings.version}`.green);
    console.log(`${bot.user.username} has started succesfully on version ${bot.settings.version}!`)

    //SET USER PRESENCE TO STREAMING
    bot.user.setPresence({
        game: {
            name: `on ${bot.settings.mcname}!`,
            type: 'STREAMING',
            url: 'https://www.twitch.tv/deadpicsel'
        }
    });

}