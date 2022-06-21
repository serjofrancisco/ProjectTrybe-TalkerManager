const fs = require('fs/promises');

async function read() {
  try {
    const data = await fs.readFile('./talker.json', { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

async function write() {
    try {
      const content = 'Some content!';
      await fs.writeFile('./talker.json', content);
    } catch (err) {
      console.log(err);
    }
  }

module.exports = {
    read,
    write,
  };