const Discord = require('discord.js')

module.exports = {
  name: "remove",
  description: "Remove an emoji from the server",
  options: [
    {
      name: "emoji",
      description: "The emoji you want to remove",
      type: "STRING",
      required: true
    }
  ],
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS)) {
return interaction.followUp({ content: `:x: | **You don't have Permission permissions to use this Command**` })
}
if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS)) {
return interaction.followUp({ content: `:x: | **I don't have permission to Manage Emojis**` })
}
let emo = args[0].match(/(?<=<?a?:?\w{2,32}:)\d{17,19}(?=>?)/gi)[0]
if (!emo) return interaction.followUp({ content: ":x: | **Emote is a required argument that is missing.**" })
if (interaction.guild.emojis.cache.get(emo)) {
  emo = interaction.guild.emojis.cache.get(emo)
} else {
  return interaction.followUp({ content: ":x: | **Emoji not found**" })
}
if (!emo.name || !emo.id) return interaction.followUp({ content: ":x: | **Invalid emote argument**" });
   try {
     emo.delete()
     interaction.followUp({ content: "**The Emoji has been removed**" })
   } catch (err) {
     interaction.followUp({ content: ":x: | **An Error occured**" })
   }
  }
}
