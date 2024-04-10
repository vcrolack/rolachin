interface DiscordCommands {
  name: string;
  description: string;
  options?: OptionsDiscordCommands[]
}

interface OptionsDiscordCommands {
  name: string;
  description: string;
  type: number;
  required: boolean
}

export enum DiscordCommandsName {
  ping,
  play,
  skip,
  queue,
}

export const commands: DiscordCommands[] = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: "play",
    description: "play music on a channel",
    options: [{
      name: 'query',
      description: 'La canción a reproducir',
      type: 3,
      required: true,
    }]
  },
  {
    name: "skip",
    description: "Jump to next song",
  },
  {
    name: "queue",
    description: "Shows the queue",
  }
]
