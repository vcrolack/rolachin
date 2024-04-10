import { Client, Interaction } from "discord.js";


export const testCommand = async (client: Client ,interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
}