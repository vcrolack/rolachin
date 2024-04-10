import express, { Request, Response } from 'express';



import { envs } from './config/environment/variables.environment';
import { verifyRequestDiscord } from './config/plugin/discord/verify-request.discord';
import { initCommands } from './config/plugin/discord/comands.discord';
import { InteractionResponseType, InteractionType } from 'discord-interactions';

const app = express();
app.use(express.json({ verify: verifyRequestDiscord(envs.publicKey || 'missing key') }));

initCommands();

app.post('/interactions', async function (req: Request, res: Response) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "test" command
    if (name === 'test') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'hello world ' + getRandomEmoji(),
        },
      });
    }
  }
});


app.listen(envs.port, () => {
  console.log(`Server listening on port ${envs.port}`);
});

function getRandomEmoji() {
  return 'Peru';
}

