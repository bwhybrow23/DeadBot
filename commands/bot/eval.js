module.exports = {
    name: "eval",
    category: "bot",
    description: "Run Node.JS code from within the bot",
    usage: "-eval <code>",
    permission: "STENTORIAN",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
   
    if (message.author.id !== '346246641595973633') return message.reply("You do not have permission to run this command!");
    try {
     let codein = args.join(" ");
     let code = eval(codein);
   
     if (typeof code !== 'string')
      code = require('util').inspect(code, {
       depth: 0
      });
     let embed = new Discord.RichEmbed()
      .setAuthor('Evaluate')
      .setColor(bot.settings.color.yellow)
      .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
      .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
      .setFooter(`Eval Command | Powered by Bearded Dragons`, bot.user.displayURL);
     message.channel.send(embed)
    } catch (e) {
     message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
   }};
