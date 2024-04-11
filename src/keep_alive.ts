import http from 'http';
import { envs } from './config/environment/variables.environment';

export const server = () => {
  http.createServer((req, res) => {
  res.write("I'm alive!");
  res.end();
}).listen(envs.port);
}