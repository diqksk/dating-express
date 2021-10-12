const express = require("express");
const app = express();
const port = 3030;
const User = require("./model/User");
const userRoute = require("./route/userRoute");
const cors = require("cors");
// const passport = require("passport");
const { passport } = require("./passport");

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/user", userRoute);

app.get("/", async (req, res) => {
  res.send(User.checkUser("diqksk@naver.com"));
});

app.listen(port, () => {
  console.log(`listening on ${port}.`);
});
