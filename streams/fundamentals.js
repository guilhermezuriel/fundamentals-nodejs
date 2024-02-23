/*
  Streams
    casos de uso mais distantes: Spotify, Netflix
    casos de uso mais próximos: importação de clientes via CSV (Excel)
      //1GB - 1.000.000 linhas
      POST /upload import.csv 
    Stream -> Ler aos poucos os dados e processar os dados, enquanto o arquivo ainda está sendo lido no servidor
    Readble Streams / Writable Streams
    --> Spotify, Netflix = Writable Streams (O backend vai enviando ao frontend, aos poucos)
    --> Importação de clientes = Readble Streams (O backend vai recebendo do frontend, aos poucos )
*/
/* 
  Readble Streams
  No node, toda porta de entrada e saída é uma stream
*/
//process.stdin -> O que recebemos de entrada
// process.stdin.pipe(process.stdout);
//stdout -> Encaminha para saída

import { transcode } from 'node:buffer';
import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    setTimeout(() => {
      const i = this.index++;
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));
        this.push(buf);
      }
    }, 1000);
  }
}

// new OneToHundredStream().pipe(process.stdout);

//Writable Stream
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  } //Transforms the data on another thing
}

class MultiplyByTenStreams extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  } //the _write method writes the data multiplied by 10, but do not change it
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStreams());
