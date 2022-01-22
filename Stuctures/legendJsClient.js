const Discord = require('discord.js');
const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { prefix } = require('../config.json');
const commandsList = [];

module.exports = class legendJsClient extends Client {
	constructor(options) {
		super(options);
		this.commands = new Collection();
	}

	loadCommands() {
		const client = this;
		readdirSync('./Commands/').forEach(dir => {
			const commands = readdirSync(`./Commands/${dir}/`).filter(file =>
				file.endsWith('.js')
			);
			for (let file of commands) {
				let pull = require(`../Commands/${dir}/${file}`);
				if (['MESSAGE', 'USER'].includes(file.type)) delete file.description;
				commandsList.push(pull);
				if (pull.name) {
					client.commands.set(pull.name, pull);
					console.log(`[${pull.name.toUpperCase()}]: loaded!`);
				} else {
					console.log(`[${file.toUpperCase()}]: Error`);
					continue;
				}
			}
			client.on('ready', async () => {
				await client.guilds.cache
					.get('881460393430618152')
					.commands.set(commandsList);
			});
		});
		console.log('-------------------------------------');
		console.log('[INFO]: Commands Loaded!');
	}
};
