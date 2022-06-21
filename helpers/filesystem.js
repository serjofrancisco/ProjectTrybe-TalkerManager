const fs = require('fs/promises');

async function read() {
  try {
    const data = await fs.readFile('./talker.json');
    return JSON.parse(data.toString());
  } catch (err) {
    return err;
  }
}

async function write(content) {
    try {
      await fs.writeFile('./talker.json', JSON.stringify(content));
    } catch (err) {
      return err;
    }
  }

module.exports = {
    read,
    write,
  };