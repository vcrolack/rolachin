import { GuildQueue } from "discord-player";

let retryCounts = new Map<string, number>();
const MAX_RETRIES = 3;

export const handleAttempts = async (queue: GuildQueue<any>, error: Error) => {
  const track = queue.currentTrack;

  if (!track) {
    console.log(`No se encontró ninguna pista activa.`);
    return;
  }

  const queueId = queue.guild.id;
  const currentRetryCount = retryCounts.get(queue.id) || 0;
  if (currentRetryCount < MAX_RETRIES) {
    retryCounts.set(queueId, currentRetryCount + 1);
    console.log(
      `Reintentando reproducir ${track.title} (${
        currentRetryCount + 1
      }/${MAX_RETRIES})`
    );
    try {
      await queue.node.play(track!);
    } catch (error) {
      console.log(`Error en el reintento: ${error}`);
    }
  } else {
    console.log(
      `No se pudo reproducir ${track.title} después de ${MAX_RETRIES} intentos.`
    );
    retryCounts.delete(queueId);
  }
};
