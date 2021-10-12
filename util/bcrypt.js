const bcrypt = require("bcrypt");

module.exports = {
  makeHashPassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, 10);
  },
  comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync("" + plainPassword, hashedPassword);
  },
};
