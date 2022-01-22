const {
    MessageButton,
    MessageActionRow,
    MessageEmbed,
    Permissions,
    Util
} = require("discord.js");

module.exports = {
    name: "list",
    description: "Shows a list of the Emojis in this Server",
    type: "CHAT_INPUT",
    run: async (client, interaction, args) => {
        let list = [];
        let emojis = [];
        interaction.guild.emojis.cache.forEach(x => emojis.push(x));
        if (emojis.size === 0) 
            return interaction.followUp({content: "There are no emojis in this server"});
        

        emojis = emojis.map((e, i) => `${
            i + 1
        }. ${e} \\${e}`);
        for (var i = 0; i < emojis.length; i += 10) {
            const items = emojis.slice(i, i + 10);
            list.push(items.join("\n"));
        }
        let page = 0;
        let button1 = new MessageButton().setEmoji("⬅️").setStyle("PRIMARY").setCustomId("previous");
        let button2 = new MessageButton().setEmoji("⏹").setStyle("DANGER").setCustomId("stop");
        let button3 = new MessageButton().setEmoji("➡️").setStyle("PRIMARY").setCustomId("next");
        let buttons = new MessageActionRow().addComponents([button1, button2, button3]);
        refreshButtons(button1, button2, button3);
        let e = new MessageEmbed().setDescription(list[page]).setFooter({
                text: `Page ${
                page + 1
            } of ${
                list.length
            } (${
                emojis.length
            } entries)`
        }).setColor("YELLOW");
        const msg = await interaction.followUp({embeds: [e], components: [buttons]});
        let doing = true;
        while (doing) {
            let r;
            const filter = function (button) {
                if (button.user !== interaction.user) 
                    return button.deferReply();
                
                return ["previous", "stop", "next"].includes(button.customId) && button.user === interaction.user;
            };
            try {
                r = await msg.awaitMessageComponent({filter, max: 1, time: 20000, errors: ["time"]})
            } catch (error) {
                console.log(error);
                return interaction.followUp("Command timed out.")
            }
            const u = interaction.user;
            if (r.customId == "next") {
                page++;
                r.deferReply();
                let newEmbed = new MessageEmbed().setDescription(list[page]).setFooter({
                        text: `Page ${
                        page + 1
                    } of ${
                        list.length
                    } (${
                        emojis.length
                    } entries)`
                }).setColor("YELLOW");
                msg.edit({embeds: [newEmbed], components: [buttons]});
            } else if (r.customId == "previous") {
                page--;
                r.deferReply() && refreshButtons(button1, button2, button3)
                let newEmbed = new Discord.MessageEmbed().setDescription(list[page]).setFooter(`Page ${
                    page + 1
                } of ${
                    list.length
                } (${
                    emojis.length
                } entries)`).setColor("YELLOW");
                msg.edit(newEmbed);
            } else if (r.customId == "stop") {
                button1.setDisabled(true) && button2.setDisabled(true) && button3.setDisabled(true)
                return;
            }
        }

        function refreshButtons(button1, button2, button3) {
            if (! list[page - 1]) 
                button1.setDisabled(true);
             else if (! list[page + 1]) 
                button3.setDisabled(true)

            

        }
    }
}
