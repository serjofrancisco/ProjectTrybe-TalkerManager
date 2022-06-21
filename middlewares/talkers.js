const validadeToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
      }
      if (authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
      }
     return next();
};

const validadeTalkerNameAge = (req, res, next) => {
    const { name, age } = req.body;
    console.log('validadaNameAge-name', name);

    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' }); 
    }
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade',
    });
    }
    return next();
}; 

const validadeTalkerTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    if (!talk.watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!talk.rate) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    return next();
};

const validateTalkContent = (req, res, next) => {
    const { talk: { watchedAt, rate } } = req.body;
    const validDate = /^\d{2}\/\d{2}\/\d{4}$/.test(watchedAt);
    if (!validDate) {
        return res.status(400).json({
             message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
             });
    }
    if (rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    return next();
};

module.exports = {
    validadeTalkerNameAge,
    validadeTalkerTalk,
    validateTalkContent,
    validadeToken,
};
