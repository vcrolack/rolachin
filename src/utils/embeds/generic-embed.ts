import { EmbedBuilder, Interaction } from "discord.js";

export const genericEmbed = (interaction: Interaction, message: string) => {
  try {
    const genericEmbed = new EmbedBuilder()
    .setColor("LightGrey")
    .setAuthor({
      name: interaction.member!.user.username,
    })
    .addFields(
      {
        name: '**Escucha wachin...**',
        value: message,
      }
    );

    return genericEmbed;
  } catch(error) {
    console.log(error);
  }
}