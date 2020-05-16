module.exports = {
    name: "status",
    category: "bot",
    description: "Gain the status of individual servers of PicselCraft.",
    usage: "-status {gamemode}",
    permission: "EVERYONE",
    run: async (bot, message, args) => {

        const Discord = require("discord.js");
        const superagent = require("superagent");
        const fs = require("fs");

        //Fetch API
        let api = await superagent
            .get('https://status.picselcraft.co.uk/api/status');

        //Server States
        let serverStat = {}
        api.body.servers.forEach(server => {
            switch (server.id) {
                case "4f93f003":
                    serverStat.bungee = server;
                case "f5516fb5":
                    serverStat.hub = server;
                case "2a1b92dc":
                    serverStat.creative = server;
                case "184df8a":
                    serverStat.smp = server;
                case "aff3a91d":
                    serverStat.stream = server;
            }
        })

        //Server Queries
        let serverQueries = {}
        api.body.query.forEach(query => {
            switch (query.id) {
                case "4f93f003":
                    serverQueries.bungee = query;
                case "f5516fb5":
                    serverQueries.hub = query;
                case "2a1b92dc":
                    serverQueries.creative = query;
                case "184df8a":
                    serverQueries.smp = query;
                case "aff3a91d":
                    serverQueries.stream = query;
            }
        })

        switch (args[0]) {

            case 'bungee':
            case 'bungeecord':
            case 'Bungee':
            case 'Bungeecord':

                // Give NameMC profile to Player Online
                let bPlayers = serverQueries.bungee.players;
                let bNewPlayers = "";

                if (bPlayers != "None") {
                    let bPlayersArray = bPlayers.split(", ");
                    bPlayersArray.forEach((player, index, array) => {
                        bPlayersArray[index] = `[${player}](https://namemc.com/search?q=${player})`;
                    })
                    bNewPlayers = bPlayersArray.join(", ")
                } else {
                    bNewPlayers = "None";
                }

                //EMBED
                let bungeeEmbed = new Discord.RichEmbed()
                    .setTitle("Bungeecord Status")
                    .setColor("#9d00ff")
                    .setDescription(serverStat.bungee.description)
                    .addField("Status", `${serverStat.bungee.state == 1 ? "Online" : "Offline"}`)
                    .addField("Version(s)", serverQueries.bungee.version)
                    .addField("Online", `${serverQueries.bungee.playersOn}/${serverQueries.bungee.playersMax}`)
                    .addField("Players Online", bNewPlayers)
                    .setFooter("BungeeCord Status | Powered by Bearded Dragons", bot.user.displayURL)
                    .setTimestamp();

                message.channel.send(bungeeEmbed);

                break;

            case 'hub':
            case 'Hub':

                // Give NameMC profile to Player Online
                let hPlayers = serverQueries.hub.players;
                let hNewPlayers = "";

                if (hPlayers != "None") {
                    let hPlayersArray = hPlayers.split(", ");
                    hPlayersArray.forEach((player, index, array) => {
                        hPlayersArray[index] = `[${player}](https://namemc.com/search?q=${player})`;
                    })
                    hNewPlayers = hPlayersArray.join(", ")
                } else {
                    hNewPlayers = "None";
                }

                //EMBED
                let hubEmbed = new Discord.RichEmbed()
                    .setTitle("Hub Status")
                    .setColor("#9d00ff")
                    .setDescription(serverStat.hub.description)
                    .addField("Status", `${serverStat.hub.state == 1 ? "Online" : "Offline"}`)
                    .addField("Version(s)", `${serverQueries.hub.version}+`)
                    .addField("Online", `${serverQueries.hub.playersOn}/${serverQueries.hub.playersMax}`)
                    .addField("Players Online", hNewPlayers)
                    .setFooter("Hub Status | Powered by Bearded Dragons", bot.user.displayURL)
                    .setTimestamp();

                message.channel.send(hubEmbed);

                break;

            case 'creative':
            case 'Creative':

                // Give NameMC profile to Player Online
                let cPlayers = serverQueries.creative.players;
                let cNewPlayers = "";

                if (cPlayers != "None") {
                    let cPlayersArray = cPlayers.split(", ");
                    cPlayersArray.forEach((player, index, array) => {
                        cPlayersArray[index] = `[${player}](https://namemc.com/search?q=${player})`;
                    })
                    cNewPlayers = cPlayersArray.join(", ")
                } else {
                    cNewPlayers = "None";
                }

                //EMBED
                let creativeEmbed = new Discord.RichEmbed()
                    .setTitle("Creative Status")
                    .setColor("#9d00ff")
                    .setDescription(serverStat.creative.description)
                    .addField("Status", `${serverStat.creative.state == 1 ? "Online" : "Offline"}`)
                    .addField("Version(s)", `${serverQueries.creative.version}+`)
                    .addField("Online", `${serverQueries.creative.playersOn}/${serverQueries.creative.playersMax}`)
                    .addField("Players Online", cNewPlayers)
                    .setFooter("Creative Status | Powered by Bearded Dragons", bot.user.displayURL)
                    .setTimestamp();

                message.channel.send(creativeEmbed);

                break;

            case 'smp':
            case 'Smp':
            case 'SMP':

                // Give NameMC profile to Player Online
                let sPlayers = serverQueries.smp.players;
                let sNewPlayers = "";

                if (sPlayers != "None") {
                    let sPlayersArray = sPlayers.split(", ");
                    sPlayersArray.forEach((player, index, array) => {
                        sPlayersArray[index] = `[${player}](https://namemc.com/search?q=${player})`;
                    })
                    sNewPlayers = sPlayersArray.join(", ")
                } else {
                    sNewPlayers = "None";
                }

                //EMBED
                let smpEmbed = new Discord.RichEmbed()
                    .setTitle("SMP Status")
                    .setColor("#9d00ff")
                    .setDescription(serverStat.smp.description)
                    .addField("Status", `${serverStat.smp.state == 1 ? "Online" : "Offline"}`)
                    .addField("Version(s)", `${serverQueries.smp.version}+`)
                    .addField("Online", `${serverQueries.smp.playersOn}/${serverQueries.smp.playersMax}`)
                    .addField("Players Online", sNewPlayers)
                    .setFooter("SMP Status | Powered by Bearded Dragons", bot.user.displayURL)
                    .setTimestamp();

                message.channel.send(smpEmbed);

                break;

            case 'stream':
            case 'survival':
            case 'stream survival':
            case 'Stream':
            case 'Survival':
            case 'Stream survival':
            case 'Stream Survival':

                // Give NameMC profile to Player Online
                let ssPlayers = serverQueries.stream.players;
                let ssNewPlayers = "";

                if (ssPlayers != "None") {
                    let ssPlayersArray = ssPlayers.split(", ");
                    ssPlayersArray.forEach((player, index, array) => {
                        ssPlayersArray[index] = `[${player}](https://namemc.com/search?q=${player})`;
                    })
                    ssNewPlayers = ssPlayersArray.join(", ")
                } else {
                    ssNewPlayers = "None";
                }

                //EMBED
                let streamEmbed = new Discord.RichEmbed()
                    .setTitle("Stream Survival Status")
                    .setColor("#9d00ff")
                    .setDescription(serverStat.stream.description)
                    .addField("Status", `${serverStat.stream.state == 1 ? "Online" : "Offline"}`)
                    .addField("Version(s)", `${serverQueries.stream.version}+`)
                    .addField("Online", `${serverQueries.stream.playersOn}/${serverQueries.stream.playersMax}`)
                    .addField("Players Online", ssNewPlayers)
                    .setFooter("Stream Survival Status | Powered by Bearded Dragons", bot.user.displayURL)
                    .setTimestamp();

                message.channel.send(streamEmbed);

                break;

            default:

                let defaultEmbed = new Discord.RichEmbed()
                    .setTitle("PicselCraft Status")
                    .setColor("#9d00ff")
                    .addField("Bungeecord", `Status: ${serverStat.bungee.state == 1 ? "Online" : "Offline"}\nPlayer Count: ${serverQueries.bungee.playersOn}/${serverQueries.bungee.playersMax}\nVersion: 1.8+`, true)
                    .addField("Hub", `Status: ${serverStat.hub.state == 1 ? "Online" : "Offline"}\nPlayer Count: ${serverQueries.hub.playersOn}/${serverQueries.hub.playersMax}\nVersion: ${serverQueries.hub.version}+`, true)
                    .addField("Creative", `Status: ${serverStat.creative.state == 1 ? "Online" : "Offline"}\nPlayer Count: ${serverQueries.creative.playersOn}/${serverQueries.creative.playersMax}\nVersion: ${serverQueries.creative.version}+`, true)
                    .addField("SMP", `Status: ${serverStat.smp.state == 1 ? "Online" : "Offline"}\nPlayer Count: ${serverQueries.smp.playersOn}/${serverQueries.smp.playersMax}\nVersion: ${serverQueries.smp.version}+`, true)
                    .addField("Stream Survival", `Status: ${serverStat.stream.state == 1 ? "Online" : "Offline"}\nPlayer Count: ${serverQueries.stream.playersOn}/${serverQueries.stream.playersMax}\nVersion: ${serverQueries.stream.version}+`, true)
                    .setFooter("PicselCraft Status | Powered by Bearded Dragons", bot.user.displayURL)
                    .setTimestamp();

                message.channel.send(defaultEmbed);

                break;
        }

    }
}