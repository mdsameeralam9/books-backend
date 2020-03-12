let jwt = require("jsonwebtoken");

let checkToken = (req, res, next) => {
  let token = req.headers["authorization"];
  console.log(token)
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
      if (error) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: " Token is not supplied"
    });
  }
};

module.exports = {
  token: checkToken
};
