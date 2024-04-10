import { ActivityType, Client, GatewayIntentBits } from 'discord.js';
import { Player } from 'discord-player';


export class DiscordController {

  public static createClient(): Client {
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

    return client;
  }

  public static createPlayer(client: Client): Player {
    const player = new Player(client, {
      lagMonitor: 1000,
      ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25
      }});
      
      return player;
  }

}