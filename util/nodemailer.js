const { smtpTransport } = require("../config/email");

const generateRandNum = () => {
  return Math.floor(Math.random() * 8999) + 1000;
};

module.exports = {
  async sendMail(email) {
    const randomNumber = generateRandNum();

    const mailOptions = {
      from: "diqksk@naver.com",
      to: email,
      subject: "[데이팅] 회원가입 인증번호 메일입니다.",
      html: `<h1>다음 번호를 입력해주세요</h1> <p style="color:red; background:#c2c2c2">${randomNumber}</p>`,
    };

    return new Promise((resolve, reject) => {
      smtpTransport.sendMail(mailOptions, (err, res) => {
        if (err) {
          console.log(err);
          resolve({ status: 500, msg: "메일 전송 실패", err: err });
        } else
          resolve({
            status: 200,
            msg: "메일 전송 완료!",
            code: randomNumber,
          });
      });
    });
  },
};
