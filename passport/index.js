require("dotenv").config();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");
const User = require("../model/User");
const bcrypt = require("../util/bcrypt");

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secretKey,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    // jwtPayload에 유저 정보가 담겨있다.
    // 해당 정보로 유저 식별 로직을 거친다.
    const user = await User.checkUser(jwtPayload.user_email);
    // 유효한 유저라면
    if (user.length !== 0) {
      console.log("맞는유저");
      done(null, user);
      return;
    }
    // 유저가 유효하지 않다면
    done(null, false, { message: "inaccurate token." });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));

// 토큰에 담길 유저명의 key를 지정하는 옵션. 패스워드도 지정할 수 있다.
const passportConfig = {
  usernameField: "user_email",
  passwordField: "user_pass",
};

// passport.use(
//   "signup",
//   new localStrategy(passportConfig, async (userName, password, done) => {
//     // 유저 생성
//     // 성공하면
//     return done(null, userName);

//     // 실패하면
//     return done(null, false, { message: "User creation fail." });
//   })
// );

passport.use(
  "login",
  new localStrategy(passportConfig, async (email, password, done) => {
    const user = await User.checkUser(email);

    // 유저가 db 에 존재한다면
    if (user.length !== 0) {
      const isValidPassword = bcrypt.comparePassword(
        password,
        user[0].user_pass
      );
      console.log(isValidPassword);
      if (isValidPassword)
        return done(null, email, { message: "로그인 성공!" });

      return done(null, false, { message: "패스워드가 틀립니다." });
    }
    // 없다면
    return done(null, false, { message: "등록되지 않은 사용자입니다." });
  })
);

module.exports = { passport };
