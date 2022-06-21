const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// const { randomUUID } = require('crypto');
const { read, write } = require('./helpers/filesystem');
const { getToken } = require('./helpers/getToken');
const { emailValidator, passwordValidator } = require('./middlewares/login');
const {
  validadeToken,
    validateTalkerName,
    validateTalkerAge,
    validadeTalkerTalk,
    validateTalkContent,
} = require('./middlewares/talkers');

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
  const token = getToken();
  return res.status(200).json({ token });
});

app.post('/talker', validadeToken,
validateTalkerName,
validateTalkerAge,
validadeTalkerTalk,
validateTalkContent,
 async (req, res) => {
 const { name, age, talk } = req.body;
 try {
  const talkers = await read();
  const newTalker = {
    name,
    age,
    id: talkers.length + 1,
    talk,
  };
  const newTalkers = [...talkers, newTalker];
   await write(newTalkers);
   return res.status(201).json(newTalker);
 } catch (err) {
   return err;
 }
});

app.put('/talker/:id', validadeToken,
validateTalkerName,
validateTalkerAge,
validadeTalkerTalk,
validateTalkContent, async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  try {
    const talkers = await read();
    const index = talkers.findIndex((el) => Number(el.id) === Number(id));
    talkers[index] = { ...talkers[index], name, age, talk };
    await write(talkers);
    return res.status(200).json(talkers[index]);
  } catch (err) {
    return err;
  }
});

app.delete('/talker/:id', validadeToken, async (req, res) => {
  const { id } = req.params;
  try {
    const talkers = await read();
    const newTalkers = talkers.filter((el) => Number(el.id) !== Number(id));
    await write(newTalkers);
    return res.status(204).end();
  } catch (err) {
    return err;
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
