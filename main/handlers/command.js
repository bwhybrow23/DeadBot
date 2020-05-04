const {
    readdirSync
} = require("fs")

const ascii = require("ascii-table");

const table = new ascii().setHeading("Command", "Load status");

module.exports = (client) => {
    readdirSync("/home/stentorian/commands/").forEach(dir => {
        const commands = readdirSync(`/home/stentorian/commands/${dir}/`).filter(f => f.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`/home/stentorian/commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);

                if (pull.name) {
                    client.commands.set(pull.name, pull);
                    table.addRow(file, '✅')
                } else {
                    table.addRow(file, '❌ -> Missing Something??');
                    continue;
                }

                if (pull.aliases && Array.isArray(pull))
                    pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
            }
        }
    })
}