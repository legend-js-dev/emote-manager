const Discord = require('discord.js');
const { parse } = require('twemoji-parser');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'backup-load',
	run: async (client, message, args, db) => {
		let code = args[0];
		if (!code) return message.channel.send(':x: | **Provide The backup ID**');
		if (!message.channel.permissionsFor(message.member).has('MANAGE_EMOJIS'))
			return message.channel.send(
				':x: | **You dont have permissions to use this command!**'
			);
		let pog = db.get(`backups_${message.author.id}`);
		let yus = new Discord.MessageEmbed()
			.setTitle('Are You sure?')
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			)
			.setDescription('Are You sure you want to load the backup?')
			.setColor('GREEN')
			.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
		let msg = await message.channel.send({ embed: yus });
		await msg.react('✅');
		await msg.react('❌');
		const filter = (reaction, user) =>
			(reaction.emoji.name === '❌' || reaction.emoji.name === '✅') &&
			user.id === message.author.id;
		msg.awaitReactions(filter, { max: 1 }).then(collected => {
			collected.map(emoji => {
				switch (emoji._emoji.name) {
					case '✅':
						msg.reactions.removeAll();
						msg.delete()
						ok()
						break;
					case '❌':
						msg.edit("**Backup Load Cancelled.**", { embed: null })
						msg.reactions.removeAll();
						return;
						break;
				}
			});
		});
		function ok() {
		  if (pog) {
			let data = pog.find(x => x.code === code);
			let No = new Discord.MessageEmbed();
			No.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			);
			No.setDescription(`:x: | **backup Not Found**`);
			No.setColor('#FF0000');
			No.setFooter(
				message.guild.name + ' | made by LΣGΣПD#0001',
				message.guild.iconURL()
			);
			No.setThumbnail(message.guild.iconURL());

			if (!data) return message.channel.send({ embed: No });
			if (!data.emojis)
				return message.channel.send(
					':x: | **There are no emojis in that backup!**'
				);
			data.emojis.forEach(emote => {
				let emoji = Discord.Util.parseEmoji(emote);
				if (emoji.id) {
					const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
						emoji.animated ? 'gif' : 'png'
					}`;
					message.guild.emojis
						.create(`${Link}`, `${`${emoji.name}`}`)
						.catch(error => {
							message.channel.send(
								':x: | an Error occured, this might be becuase of not enough space for emojis.'
							);
							console.log(error);
						});
				}
			});
			message.channel.send('**The backup has been loaded.**');
		} else {
			let embed = new Discord.MessageEmbed();
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setDescription(`:x: | **The backup was not found!**`);
			embed.setFooter(
				message.guild.name + ' | made by LΣGΣПD#0001',
				message.guild.iconURL()
			);
			embed.setColor('#FF0000');
			embed.setTimestamp();

			return message.channel.send({ embed: embed });
		}
		}
	}
};
