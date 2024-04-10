import { envs } from "./config/environment/variables.environment";
import { commands } from "./config/discord/commands";

import { Client, ClientOptions, Message, IntentsBitField, REST, Routes, GatewayIntentBits, ActivityType } from "discord.js";
import { Player } from "discord-player";

import { prefix } from "./config.json";
import { init, play, testCommand } from "./events";

const rest = new REST({ version: '10' }).setToken(envs.discordToken!);

try {
  console.log('Started refreshing application (/) commands.');

  rest.put(Routes.applicationCommands(envs.appId!), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates], 
  presence: {
    status: 'online', 
    activities: [{
      name: 'Modo Beto Bullicio',
      type: ActivityType.Playing,
    }],
  }
});
const player = new Player(client, {
  lagMonitor: 1000,
  ytdlOptions: {
    filter: "audioonly",
    quality: "highestaudio",
    highWaterMark: 1 << 25
  }});

client.on('ready', (client) => {
  init(client, player);
});

client.on('interactionCreate', async interaction => {
  testCommand(client, interaction);
});

client.on('interactionCreate', async (interaction) => {
  await play(client, interaction)
});

player.events.on('playerStart', (queue, track) => {
  queue.metadata.channel.send(`Reproduciendo **${track.title}**!`);
});

player.events.on('error', (queue, error) => console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`));
player.events.on('debug', (_queue, message) => console.log(`[('DEBUG')] ${message}\n`));

client.login(envs.discordToken);
