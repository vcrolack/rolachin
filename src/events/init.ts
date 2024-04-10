import { Player } from "discord-player";
import { Client } from "discord.js";

export const init = async (client: Client, player: Player) => {
  await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');
  console.log(`Logged in as ${client.user!.tag}!`);
}