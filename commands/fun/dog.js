module.exports = {
    name: "dog",
    category: "fun",
    description: "Get a random image of a dog.",
    usage: "-dog",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

    const Discord = require("discord.js");
    const superagent = require("superagent");

    let {
        body
    } = await superagent
        .get('https://random.dog/woof.json')

    let dogEmbed = new Discord.RichEmbed()
        .setColor("#ff9900")
        .setTitle("Cute Doggo! :dog:")
        .setImage(body.url)
        .setFooter(`${message.author.tag}`, `${message.author.avatarURL}`);


    message.channel.send(dogEmbed);

}};
