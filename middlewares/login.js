// const loginMiddleWare = (req, res, next) => { 
//     const { email, password } = req.body;
//     const validEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email);
//     const validPassword = Number(password) && password.length >= 6;
//     if (!validEmail || !validPassword) {
//         return res.status(400).json({
//             message: 'email or password is incorrect',
//         });
//     }
//     next();
// };

const emailValidator = (req, res, next) => {
    const { email } = req.body;
    const validEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email);
    if (!email) {
        return res.status(400).json({
            message: 'O campo "email" é obrigatório',
        });
    }
    if (!validEmail) {
        return res.status(400).json({
            message: 'O "email" deve ter o formato "email@email.com"',
        }); 
    }
    next();
};

const passwordValidator = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({
            message: 'O campo "password" é obrigatório',
        });
    }
    const validPassword = password.length >= 6;
    if (!validPassword) {
        return res.status(400).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
        }); 
    }
    next();
};

module.exports = {
    emailValidator,
    passwordValidator,
};
