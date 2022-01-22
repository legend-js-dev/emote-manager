const Client = require('./Stuructures/legendJsClient');
const Discord = require('discord.js');
const {token} = require('./config.json');
const client = new Client({intents: 32767});

client.loadCommands();
console.log('-------------------------------------');
console.log('[CREDITS]: made by legend-js | https://github.com/legend-js-dev | legendjs#0001');
console.log('-------------------------------------');

client.on('ready', () => {
    console.log(`[INFO]: Ready on client (${
        client.user.tag
    })`);
    console.log(`[INFO]: watching ${
        client.guilds.cache.size
    } Servers, ${
        client.channels.cache.size
    } channels & ${
        client.users.cache.size
    } users`);
    console.log('-------------------------------------');
    client.user.setActivity('you', {type: 'WATCHING'});
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const cmd = client.commands.get(interaction.commandName);
        if (!cmd) return interaction.followUp({ content: ':x: | **an Unexpected Error Ocurred**' });

        await interaction.deferReply({
            ephemeral: cmd.ephemeral ? true : false
        }).catch(() => {});

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) 
                    args.push(option.name);
                
                option.options ?. forEach(x => {
                    if (x.value) 
                        args.push(x.value);
                    
                });
            } else if (option.value) 
                args.push(option.value);
            
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }
});

client.login(token);

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
