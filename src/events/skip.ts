import { usePlayer, useQueue } from "discord-player";
import { Interaction } from "discord.js";
import { genericEmbed } from "../utils";

export const skip = async (interaction: Interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName !== 'skip') return;

    await interaction.deferReply();

    const queue = useQueue(interaction.guild!.id);
    console.log(queue?.tracks);
    if (!queue || queue.tracks.toArray().length === 0) {
      const queueEmptyEmbed = genericEmbed(interaction, ':eject: No hay nada en la cola.\n\n COLOCA UN TEMAZO!')
      interaction.editReply({
        embeds: [queueEmptyEmbed!],
      });
      return;
    }

    if( !queue.isPlaying() ) {
      interaction.editReply('No se está reproduciendo nada, payaso');
      return;
    }
    const guildPlayerNode = usePlayer(interaction.guild!.id);
    if (!guildPlayerNode?.queue) {
      interaction.editReply('No se está reproduciendo nada, payaso');
      return;
    }


    const currentTrack = guildPlayerNode.queue.currentTrack;
    const success = guildPlayerNode.skip();
    const embedSuccess = success ? 
      genericEmbed(interaction, `:track_next: Skipeada **${currentTrack?.title}**\n 
      Próxima rola: ${queue.tracks.toArray().length > 0 ? queue.tracks.toArray()[0] : 'Ninguna, coloca un temazo!'} `)
      : genericEmbed(interaction, 'Algo ha fallado chaval, cuéntale a Carlomagnesio');

    return await interaction.editReply({
      embeds: [ embedSuccess! ]
    })
  }
};