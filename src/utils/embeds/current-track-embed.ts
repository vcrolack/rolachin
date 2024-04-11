import { Track } from "discord-player";
import { EmbedBuilder, Interaction } from "discord.js";

export const currentTrackEmbed = (interaction: Interaction, track: Track) => {
  try {
    let trackEmbed = new EmbedBuilder()
      .setColor("LightGrey")
      .setAuthor({
        name: interaction.member!.user.username,
        iconURL: interaction.member!.avatar!,
      })
      .setTimestamp()
      .addFields({
        name: ":musical_note: Reproduciendo, maquinola!",
        value: `${track.title} By ${track.author}`,
        inline: false,
      });

      return trackEmbed;
  } catch (error) {
    console.error(error);
  }
}
