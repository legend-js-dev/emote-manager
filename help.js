const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');
module.exports = {
	name: 'help',
	run: async (client, message, args) => {
		let embed = new MessageEmbed()
			.setTitle(client.user.username + ' | Help')
			.setColor('RANDOM')
			.setFooter(
				message.guild.name + ' | made by LΣGΣПD#0001 & ant#0768',
				message.guild.iconURL()
			)
			.setDescription(
				`My main Prefix is: \`${prefix}\`, The Commands are listed below:`
			)
			.addField(
				'Emoji Backup',
				'`backup-create` | `backup-delete` | `backup-list` | `backup-load`'
			)
			.addField(
				'Emoji',
				'`add-these` | `add` | `big` | `list` | `remove` | `rename` | `stats`'
			)
			.setThumbnail(client.user.displayAvatarURL({ dynamic: true }));
		message.channel.send({ embed: embed });
	}
};
