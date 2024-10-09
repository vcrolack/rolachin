import { envs } from "./config/environment/variables.environment";
import { commands } from "./config/discord/commands";

import { REST, Routes } from "discord.js";

import { init, play, queue, skip, testCommand } from "./events";
import { DiscordController } from "./config/discord/discord-controller";
import { server } from "./keep_alive";
import { handleAttempts } from "./utils";

const rest = new REST({ version: "10" }).setToken(envs.discordToken!);

try {
  server();
  console.log("Started refreshing application (/) commands.");

  rest.put(Routes.applicationCommands(envs.appId!), { body: commands });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}

const client = DiscordController.createClient();
const player = DiscordController.createPlayer(client);

// LISTENER OF EVENTS
client.on("ready", (client) => {
  init(client, player);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.guild!.id !== envs.smashId) return;

  if (!interaction.isCommand()) return;
  switch (interaction.commandName) {
    case "ping":
      testCommand(client, interaction);
      break;
    case "play":
      await play(client, interaction);
      break;
    case "queue":
      await queue(client, player, interaction);
      break;
    case "skip":
      await skip(interaction);
      break;

    default:
      interaction.reply("Ingresa un comando válido");
  }
});

player.events.on("error", async (queue, error) => {
  console.log(
    `[${queue.guild.name}] Error emitted from the queue: ${error.message}`
  );
  await handleAttempts(queue, error);
});
player.events.on("debug", (_queue, message) =>
  console.log(`[('DEBUG')] ${message}\n`)
);
player.events.on("playerFinish", (queue, track) => {
  console.log(`[${queue.guild.name}] La canción ${track.title} ha terminado.`);

  if (queue.tracks.data.length > 0) {
    console.log(
      `[${queue.guild.name}] Reproduciendo la siguiente canción en la cola...`
    );
  } else {
    console.log(`[${queue.guild.name}] No quedan más canciones en la cola.`);
  }
});

client.login(envs.discordToken);
