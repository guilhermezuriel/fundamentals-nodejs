//Buffers

//Representação de um espaço da memória no computador, maneiras de salvar e ler da memória de forma perfomática
//perfomática de maneira binária

const buf = Buffer.from('ok'); //<Buffer 6f 6b> //Hexadecimal

console.log(buf);
console.log(buf.toJSON()); //{ type: 'Buffer', data: [ 111, 107 ] } Decimal
