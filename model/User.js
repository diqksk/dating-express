const db = require("../util/mysql");

module.exports = {
  checkUser(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE user_email = ?",
        email,
        (err, data, field) => {
          if (err) console.log(err);
          else {
            resolve(data);
          }
        }
      );
    });
  },
  registerUser(userData) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users(user_email, user_pass, user_name, user_phone, user_age, user_gender, user_location, user_extra_location) VALUES(?,?,?,?,?,?,?,?)",
        [...userData],
        (err, data, field) => {
          if (err) console.log(err);
          else resolve({ status: 200, msg: "회원가입 성공" });
        }
      );
    });
  },
};
