module.exports = {
    name: "stats",
    description: "Emoji stats for the server",
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {
        const config = [100, 200, 300, 500];
        let emo;
        if (interaction.guild.premiumSubscriptionCount == 0) 
            emo = config[0];
         else if (interaction.guild.premiumSubscriptionCount >= 2 && interaction.guild.premiumSubscriptionCount < 7) 
            emo = config[1];
         else if (interaction.guild.premiumSubscriptionCount >= 7 && interaction.guild.premiumSubscriptionCount < 14) 
            emo = config[2];
         else if (interaction.guild.premiumSubscriptionCount >= 14) 
            emo = config[3];

        const staticEmojis = `**${
            interaction.guild.emojis.cache.filter(e => !e.animated).size
        } / ${
            emo / 2
        }** (${
            emo / 2 - interaction.guild.emojis.cache.filter(e => !e.animated).size
        } left, ${
            Number((interaction.guild.emojis.cache.filter(e => !e.animated).size / emo / 2) * 100).toFixed(2)
        }% full)`;
        const aniEmojis = `**${
            interaction.guild.emojis.cache.filter(e => e.animated).size
        } / ${
            emo / 2
        }** (${
            emo / 2 - interaction.guild.emojis.cache.filter(e => e.animated).size
        } left, ${
            Number((interaction.guild.emojis.cache.filter(e => e.animated).size / emo / 2) * 100).toFixed(2)
        }% full)`;
        const totEmojis = `**${
            interaction.guild.emojis.cache.size
        } / ${emo}** (${
            emo - interaction.guild.emojis.cache.size
        } left, ${
            Number((interaction.guild.emojis.cache.size / emo) * 100).toFixed(2)
        }% full)`;
        const stati = `Static emotes: ${staticEmojis}`;
        const ani = `Animated emotes: ${aniEmojis}`;
        const tot = `Total: ${totEmojis}`;
        const res = `${stati}\n${ani}\n${tot}`;
        interaction.followUp({content: res});
    }
}
