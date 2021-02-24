console.clear();
console.log('[INFO]: Loading...');
//emote manager clone bot coded by legend & ant >:D
const { Client, Collection } = require('discord.js');
const discord = require('discord.js');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
//dont touch the credits or i will find you and u will have to commit die >:D
const client = new Client({
	disableMentions: 'everyone'
});

client.commands = new Collection();
client.aliases = new Collection();

['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

const db = require("quick.db")

console.log('-------------------------------------');
console.log(`
██╗     ███████╗ ██████╗ ███████╗███╗   ██╗██████╗         ██╗███████╗
██║     ██╔════╝██╔════╝ ██╔════╝████╗  ██║██╔══██╗        ██║██╔════╝
██║     █████╗  ██║  ███╗█████╗  ██╔██╗ ██║██║  ██║        ██║███████╗
██║     ██╔══╝  ██║   ██║██╔══╝  ██║╚██╗██║██║  ██║   ██   ██║╚════██║
███████╗███████╗╚██████╔╝███████╗██║ ╚████║██████╔╝██╗╚█████╔╝███████║
╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝ ╚════╝ ╚══════╝
`);
console.log('-------------------------------------');
console.log(`
 █████╗ ███╗   ██╗████████╗     ██╗███████╗
██╔══██╗████╗  ██║╚══██╔══╝     ██║██╔════╝
███████║██╔██╗ ██║   ██║        ██║███████╗
██╔══██║██║╚██╗██║   ██║   ██   ██║╚════██║
██║  ██║██║ ╚████║   ██║██╗╚█████╔╝███████║
╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝╚═╝ ╚════╝ ╚══════╝
`)
console.log('-------------------------------------');
//this took me some time so dont you dare remove credits, if u do remove credits then you will have copy right issues.
client.on('ready', () => {
	console.log(`[INFO]: Ready on client (${client.user.tag})`);
	client.user.setActivity('emote manager clone by legend & ant :D', {
		type: 'WATCHING'
	});
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member)
		message.member = await message.guild.fetchMember(message);

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	if (command) command.run(client, message, args, db);
});

client.login(token).catch(err => {
	console.log('[ERROR]: Invalid Token Provided');
});
