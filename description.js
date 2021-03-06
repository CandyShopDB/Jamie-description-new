const fs = require('fs');
const faker = require('faker');

const writeStream = fs.createWriteStream('description.csv');

const writeNTimes = (writer, data, encoding, callback) => {
  let i = 10001;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 10000) {
        writer.write(`id,title,comment\n`, encoding, callback);
      } else {
        data = `${faker.lorem.word()},${faker.lorem.sentence()}`;
        let index = 10000 - i;
        ok = writer.write(`${index},${data}\n`, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
};

writeNTimes(writeStream, faker.lorem.word());
