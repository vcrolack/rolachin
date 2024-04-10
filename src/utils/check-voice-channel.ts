import { CommandInteraction, GuildMember, Interaction, VoiceBasedChannel, VoiceChannel } from "discord.js";

export const checkVoiceChannel = async ( interaction: CommandInteraction ): Promise<VoiceChannel | null> => {
  const member = interaction.member as GuildMember
  const channel = member?.voice.channel;

  if (!channel) {
    await interaction.reply('Debes estar en un canal de voz para usar este comando')
  }
  
  
  return channel as VoiceChannel;
}