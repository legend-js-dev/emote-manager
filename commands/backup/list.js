const Discord = require("discord.js")
module.exports = {
  name: "backup-list",
  run: async (client, message, args, db) => {
    let yus = db.get(`backups_${message.author.id}`)
    if (yus === null) return message.channel.send(":x: | **There are no backups created by you.**")
    if (!yus.toString()) return message.channel.send(":x: | **There are no backups created by you.**")
    let arr = new Array()
    yus.forEach(x => {
      arr.push(`${x.server} - ${x.code} - ${x.emojis.length}`)
    })
    let embed = new Discord.MessageEmbed()
    .setTitle("Backup list")
    .setDescription(`Server name - Backup ID - emojiCount\n${arr.join("\n")}`)
    embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
    embed.setFooter(message.guild.name + " | made by LΣGΣПD#0001 & ant#0768", message.guild.iconURL());
embed.setColor("GREEN")
embed.setTimestamp()
            return message.channel.send({ embed: embed });
    message.channel.send({ embed: embed })
  }
}
