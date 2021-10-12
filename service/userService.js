const User = require("../model/User");
const bcrypt = require("../util/bcrypt");
const mailSender = require("../util/nodemailer");

module.exports = {
  async getUserList(email) {
    await User.checkUser(email);
  },
  async registerUser(userData) {
    const user = await User.checkUser(userData.user_email);
    //유효성검사
    if (user.length !== 0) {
      return { status: 403, msg: "이미 존재하는 email입니다." };
    }

    //패스워드 암호화
    const hashedData = {
      ...userData,
      user_pass: bcrypt.makeHashPassword(userData.user_pass),
    };
    //데이터 베이스에 등록
    return await User.registerUser(Object.values(hashedData));
  },
  async sendEmail(email) {
    const checkResult = await User.checkUser(email);
    console.log(checkResult.length);
    if (checkResult.length !== 0) {
      return { status: 500, err: "이미 존재하는 email입니다." };
    }
    return await mailSender.sendMail(email);
  },
};
