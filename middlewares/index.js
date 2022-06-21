const loginMiddleWare = (req, res, next) => { 
    const { email, password } = req.body;
    const validEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email);
    const validPassword = Number(password);
    if (!validEmail || !validPassword) {
        return res.status(400).json({
            message: 'email or password is incorrect',
        });
    }
    next();
};

module.exports = {
    loginMiddleWare,
};
