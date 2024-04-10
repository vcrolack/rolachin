import { Client, Interaction } from "discord.js";
import { checkVoiceChannel } from "../utils";
import { useMainPlayer } from "discord-player";

 
export const play = async (client: Client, interaction: Interaction) => {

  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'play') {
    const player = useMainPlayer();
    const channel = await checkVoiceChannel(interaction);

    if(!channel) return;

    const query = interaction.options.get('query')?.value?.toString();

    if (!query) return await interaction.editReply('Debes colocar una canción. Espabila!');

    await interaction.deferReply();

    try {
      const searchResult = await player.search(query, {
        requestedBy: interaction.user,
        
      });

      if (!searchResult.tracks.length) {
        await interaction.editReply('No se encontraron resultados.');
        return;
      }

      const track = searchResult.tracks[0];

      await player.play(channel, track, {
        nodeOptions: {
          metadata: interaction,
        },
      });

      return await interaction.editReply(`**${track.title}** agregada a la cola, chaval!`);

    } catch (error) {
      console.log('Ha ocurrido un error al buscar la pista, consulta con Carlomagnesio ', error);
      return interaction.followUp(`Ha ocurrido un error. Consulta con Carlomagnesio`);
    }

  }
};