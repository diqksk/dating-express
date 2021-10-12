require("dotenv").config();
module.exports = {
  production() {
    return {
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: "dating",
    };
  },

  development() {
    console.log(process.env.host);
    return {
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: "dating",
    };
  },
};
