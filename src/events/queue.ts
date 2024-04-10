import { Client, Interaction } from "discord.js";

export const queue = async (client: Client, interaction: Interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName !== 'queue') return;

    interaction.reply('Esta será la cola chaval');

  }

};