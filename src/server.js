import http from 'node:http';

/*
CRUD
-Criar
-Remover
-Update
-Delete */

//HTTP
/*
    -Método HTTP = GET POST PUT PATCH DELETE
    -URL

    GET => Buscar uma informação do backend
    POST => Criar um recurso no back-end
    PUT => Atualizar um recurso no back-end
    PATCH => Atualizar uma informação específica de um recurso no back-end
    DELETE => Remover um recurso no back-end

    Stateful vs Stateless

    -> Statefull = Salva informações em memória
    -> Stateless = Salva informações em banco de dados, arquivos de texto e etc

    Como o front-end vai saber se o dado recebido esta em formato JSON ?
    Headers(Cabeçalhos| Requisição/Resposta) => Metadados

    HTTP STATUS CODE
    
    INFORMATIVOS (100-199)
    SUCESSO (200-299) PADRÃO = 200
    REDIRECTION MESSAGES (300-399)
    CLIENT ERROR (400-499) -> Erros geradas na requisição do Front-end
    SERVER ERROR (500-599) -> Erros gerados na response do Back-end
  */
const users = [];
import { json } from './middlewares/json.js';
const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  await json(req, res);
  if (method == 'GET' && url == '/users') {
    return res.end(JSON.stringify(users));
  }
  if (method === 'POST' && url == '/users') {
    const { name, email } = req.body;
    users.push({
      id: 1,
      nome: name,
      email: email,
    });
    return res.writeHead(201).end();
  }
  return res.writeHead(404).end('Not Found'); //Error 404 - Qualquer rota que não exista
});

server.listen(3333);
