import { Client, Interaction } from "discord.js";
import { useMainPlayer, useQueue } from "discord-player";

import { addTrackEmbed, checkVoiceChannel, currentTrackEmbed } from "../utils";

 
export const play = async (client: Client, interaction: Interaction) => {

  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'play') {
    const player = useMainPlayer();
    const channel = await checkVoiceChannel(interaction);

    if(!channel) return;

    const queryOption = interaction.options.get('query');
    const query = queryOption ? queryOption.value?.toString() : null;

    if (!query) return await interaction.editReply('Debes colocar una canción. Espabila!');

    await interaction.deferReply();

    try {
      const searchResult = await player.search(query, {
        requestedBy: interaction.user,
        
      });

      if (!searchResult.hasTracks()) {
        await interaction.editReply('No se encontraron resultados.');
        return;
      }

      const track = searchResult.tracks[0];

      const trackEmbed = currentTrackEmbed(interaction, track);

      const queue = useQueue(interaction.guild!.id);
      if (queue?.isPlaying()) {
        const addTrack = addTrackEmbed(interaction, track);
        queue.addTrack(track);
        return await interaction.editReply({
          embeds: [ addTrack! ],
        })
      }
      await player.play(channel, track, {
        nodeOptions: {
          metadata: interaction,
        },
      });

      return await interaction.editReply({
        embeds: [ trackEmbed! ],
      });

    } catch (error) {
      console.log('Ha ocurrido un error al buscar la pista, consulta con Carlomagnesio ', error);
      return interaction.followUp(`Ha ocurrido un error. Consulta con Carlomagnesio`);
    }
  }
};