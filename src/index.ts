import express from 'express';
import { envs } from './config/environment/variables.environment';

const app = express();

app.listen(envs.port, () => {
  console.log(`Server listening on ${envs.port}`);
});
