const {Util} = require("discord.js");
module.exports = {
    name: "big",
    description: "Enlarge an emoji",
    options: [
        {
            name: "emoji",
            type: "STRING",
            description: "The emoji to enlarge",
            required: true
        }
    ],
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {
        if (!args[0]) 
            return interaction.followUp({content: ":x: **Emote is a required argument that is missing.**"});
        
        const emo = Util.parseEmoji(args[0]);
        if (! emo.name || ! emo.id) 
            return interaction.followUp({content: "Invalid emote argument"});
        
        const res = `${
            emo.name
        }: https://cdn.discordapp.com/emojis/${
            emo.id
        }.${
            emo.animated ? "gif" : "png"
        }`;
        interaction.followUp({content: res});
    }
}
