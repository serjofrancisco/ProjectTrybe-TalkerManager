const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const { randomUUID } = require('crypto');
const { read } = require('./helpers/filesystem');
const { emailValidator, passwordValidator } = require('./middlewares');

app.get('/talker', async (req, res) => {
    try {
        const talkers = await read();
        return res.status(200).json(talkers);
    } catch (error) {
        return error;
    }
});

app.get('/talker/:id', async (req, res) => {
  const { id: talkerId } = req.params;
  const talkers = await read();
  const selectTalker = talkers.find((el) => Number(el.id) === Number(talkerId));

  if (!selectTalker) {
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(selectTalker);
});

app.post('/login', emailValidator, passwordValidator, (req, res) => {
  const token = randomUUID().split('-').join('').substring(0, 16);
  return res.status(200).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
