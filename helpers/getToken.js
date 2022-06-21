const getToken = () => {
    const options = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 16; i += 1) {
      const randomChar = Math.floor(Math.random() * options.length);
      token += options[randomChar];
    }
    return token;
  };
console.log(getToken());
  module.exports = {
    getToken,
  };