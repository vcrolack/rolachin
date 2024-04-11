import { GuildQueue, Track } from "discord-player";
import { EmbedBuilder, Interaction } from "discord.js";

export const queueEmbed = (interaction: Interaction, queue: GuildQueue, queueTracks: Track[]) => {
   try{
    let queueEmbed = new EmbedBuilder()
    .setColor("LightGrey")
    .setAuthor({
      name: interaction.member!.user.username,
      iconURL: interaction.guild!.iconURL()! , 
    })
    .setTimestamp()
    .addFields(
      {
        name: ":musical_note: Now Playing",
        value: queue.currentTrack!.title,
        inline: true,
      },
      {
        name: ":notes: Queue",
        value: queueTracks.map((track, idx) => (`${++idx} ${track.title}`)).join('\n'),
        inline: false,
      },
    )
    return queueEmbed;
  } catch(error) {
    console.log(error);
  }
}