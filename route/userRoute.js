const express = require("express");
const router = express.Router();
const userService = require("../service/userService");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { isLoggedIn } = require("../util/isLogIn");

router.post("/", async (req, res) => {
  res.send(await userService.registerUser(req.body));
});

router.get("/", async (req, res) => {
  console.log(req.query.email);
  const result = await userService.sendEmail(req.query.email);

  res.send(result);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (!user) {
      console.log(info);
      res.send({ status: "400", err: info.message });
    } else {
      const token = jwt.sign(
        {
          user_email: req.body.user_email,
          exp: new Date().getTime() / 1000 + 6 * 60 * 60, //6시간 expire date설정
        },
        process.env.secretKey
      );
      res.json({
        msg: "로그인이 되셨습니다.",
        token,
        user_email: req.body.user_email,
      });
    }
  })(req, res, next);
});

router.get("/test", isLoggedIn, (req, res) => {
  console.log("ㅎㅇ");
});

module.exports = router;
