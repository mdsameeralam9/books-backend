const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const login = async function(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ user }, process.env.JWTSECRET);

        res.send({
          msg: "Sucess",
          name: user.name,
          email: user.email,
          access_token: token
        });
      } else {
        res.send({
          msg: "Password incorrect"
        });
      }
    } else {
      res.send({
        msg: "User does not exist"
      });
    }
    console.log(user);
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

const signup = async function(req, res) {
  const newUser = new User(req.body);
  const response = await newUser.save();

  res.send(response);
};

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
