import { Track } from "discord-player";
import { EmbedBuilder, Interaction } from "discord.js";

export const addTrackEmbed = (interaction: Interaction ,track: Track) => {
  try {

    const trackEmbed = new EmbedBuilder()
      .setColor("LightGrey")
      .setAuthor({
        name: interaction.member!.user.username,
        iconURL: interaction.member!.avatar!,
      })
      .addFields(
        {
          name: `:loud_sound: se agregó a la cola ${track.title}`,
          value: `${track.title} By ${track.author},`
        },
      )

      return trackEmbed;
  } catch(error) {

  }
}