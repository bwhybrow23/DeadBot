module.exports = async (bot) => {

    const utils = require("../../main/functions/utilities.js");
    const chalk = require('chalk');

    //CONSOLE LOG IT BEING TURNED ON
    let date = new Date;
    console.log(chalk.gray(`[SYSTEM]`), chalk.green(`${bot.user.username} has Started Succesfully. Version: ${bot.settings.version}`));
    // console.log('[SYSTEM]'.grey, `${bot.user.username} Has Started Successfully. Version: ${bot.settings.version}`.green);
    // console.log(`${bot.user.username} has started succesfully on version ${bot.settings.version}!`)

    //SET USER PRESENCE TO STREAMING
    bot.user.setPresence({
        game: {
            name: `on ${bot.settings.mcname}!`,
            type: 'STREAMING',
            url: 'https://www.twitch.tv/deadpicsel'
        }
    });

    //SET USER PRESENCE TO MAINTENENCE
    // bot.user.setPresence({
    //     game: {
    //         name: `With Code! (Under Maintenence)`,
    //         type: "Playing"
    //     }
    // });

}
