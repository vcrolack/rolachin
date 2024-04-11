import { Player, useMainPlayer, useQueue } from "discord-player";
import { Client, Interaction } from "discord.js";
import { queueEmbed } from "../utils/embeds/queue-embed";

export const queue = async (client: Client, player: Player, interaction: Interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName !== 'queue') return;

    await interaction.deferReply();

    const queue = useQueue(interaction.guild!.id);

    if (!queue || queue.tracks.toArray().length === 0) {
      interaction.editReply('Nada pendiente que reproducir');
      return;
    }

    let currentQueue = queue.tracks.toArray();
    
    const embedQueue = queueEmbed(interaction, queue, currentQueue);

    currentQueue.forEach((track, idx) => {
      console.log(idx, track.title)
    })

    if (embedQueue) {
      await interaction.editReply({
        embeds: [embedQueue],
      });
    }
  }
};