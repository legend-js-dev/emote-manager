const {parse} = require("twemoji-parser");
const {Permissions, Util} = require("discord.js");
const isUrl = require("is-url");

module.exports = {
    name: "add",
    description: "Add an Emoji to the server",
    options: [
        {
            name: "emoji",
            type: "STRING",
            description: "The emoji",
            required: true
        }
    ],
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {
        let emoji;
        let link;
        let type = "";
        let EmojiName = "";
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS)) {
            return interaction.followUp(`:x: | **You don't have the required permissions to use this command**`)
        }
        let emote = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
        
        if (emote) {
            emote = emote[0];
            type = "emoji";
            EmojiName = args.join(" ").replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "").trim().split(" ")[0];
        } else {
            emote = `${
                args.find(arg => isUrl(arg))
            }`
            EmojiName = args.find(arg => arg != emote);
            type = "url";
        }
        emoji = {
            name: ""
        };
        if (type == "emoji") {
            emoji = Util.parseEmoji(emote);
            link = `https://cdn.discordapp.com/emojis/${
                emoji.id
            }.${
                emoji.animated ? "gif" : "png"
            }`
        } else {
            if (!EmojiName) 
                return interaction.followUp({content: ":x: **Please provide a name!**" });
            link = emote;
        }
        interaction.guild.emojis.create(`${link}`,
                `${
            `${
                EmojiName || emoji.name
            }`
        }`).then(em => interaction.followUp({ content: em.toString() + " added!" })).catch(error => {
            if (error.code == 30008) {
                return interaction.followUp({content:":x: **Max Emoji slots reached.**"})
            }
            return interaction.followUp(`:x: | an Error occured, Error code: ${error.code}`);
        })
    }
}
