//How streams are connected on Nodejs ?
import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}
// Req => Readable Stream  // res => Writable Stream
/* If req is readable stream, the stream contains chunk. A chunk is a fragment of the data that is sent by the client to server all chunks concepts to each other to make a buffer of the stream then the buffer is converted into meaningful data */

const server = http.createServer(async (req, res) => {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const fullStreamContent = Buffer.concat(buffers).toString();
  console.log(fullStreamContent);
  return res.end(fullStreamContent);
  // return req.pipe(new InverseNumberStream()).pipe(res);//Read the data and write it on demand.
});

server.listen(3334);
