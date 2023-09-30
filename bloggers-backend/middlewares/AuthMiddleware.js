const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports.CheckUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "GautamChopra", async (err, decodedToken) => {
      // header,payload,signature
      if (err) {
        res.json({
          status: false,
          message: "token not found",
        });
      } else {
        const user = await User.findById(decodedToken.id);

        if (user) {
          res.json({
            status: true,
            user: user.email,
            id: decodedToken.id,
          });
        } else {
          res.json({
            status: false,
            message: "user not found",
          });
        }
      }
    });
  } else {
    res.json({
      status: false,
      message: "nothing found",
    });
  }
//   next();
};
