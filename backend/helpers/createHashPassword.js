const bcrypt = require("bcrypt");

module.exports = (password) => {
    const hashedPassword = bcrypt.hashSync(password, +process.env.BCRYPT_KEY);

    return hashedPassword
}