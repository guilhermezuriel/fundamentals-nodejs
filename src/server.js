import http from 'node:http';

import { json } from './middlewares/json.js';
import { routes } from './routes.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  await json(req, res);
  const route = routes.find((route) => {
    return route.method === method;
  });
  if (route) {
    return route.handler(req, res);
  }
  return res.writeHead(404).end('Not Found'); //Error 404 - Qualquer rota que não exista
});

server.listen(3333);
