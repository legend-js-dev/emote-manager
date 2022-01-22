const {parse} = require("twemoji-parser");
const {Permissions, Util,} = require("discord.js");

module.exports = {
    name: 'addthese',
    description: 'Add multiple Emojis at once',
    options: [
        {
            type: 'STRING',
            name: 'emojis',
            description: 'The Emojis you want to add',
            required: true
        }
    ],
    type: 'CHAT_INPUT',
    run: async (client, interaction, args) => {
        let emoji;
        let Link;
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS)) {
            return interaction.followUp(`:x: | **You don't have the required permissions to use this command**`)
        }
        const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
        if (!emojis) return interaction.followUp(`:x: | **No emojis found in the arguments provided**`);

        emojis.forEach((emote, i) => {
            setTimeout(function () {
                emoji = Util.parseEmoji(emote);
                if (emoji.id) {
                    Link = `https://cdn.discordapp.com/emojis/${
                        emoji.id
                    }.${
                        emoji.animated ? "gif" : "png"
                    }`
                    interaction.guild.emojis.create(`${Link}`, `${`${
                            emoji.name
                        }`
                    }`).then(em => interaction.followUp({
                        content: em.toString() + " added!"
                    })).catch(error => {
                        if (error.code == "30008") {
                            return interaction.followUp({ content: ":x: Max emoji slots used."});
                        }
                        interaction.followUp(`:x: | an Error ocurred, error code: ${
                            error.code
                        }`)
                    })

                }
            }, (i + 1) * 1000)
        })
    }
}
