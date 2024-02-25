import { randomUUID } from 'node:crypto'; //ID Universal Único
import { Database } from './database.js';
import { buildRoutePath } from './utils/buildRoutePath.js';
const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select('users');
      return res.end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body;
      const user = {
        id: randomUUID(),
        nome: name,
        email: email,
      };
      database.insert('users', user);
      return res.writeHead(201).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      return res.end();
    },
  },
];
