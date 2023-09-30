const UserRegister = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60; // validity of jwt till 3 days

const createToken = (id) => {
  return jwt.sign({ id }, "GautamChopra", {
    expiresIn: maxAge,
  });
};

// SIGNUP
module.exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserRegister.findOne({ email: email });
    
    if (user) {
        res.send({ message: "User Already Registered" });
      } else {
        const userData = new UserRegister({
          name: name,
          email: email,
          password: password,
        });

        userData.save().then(() => {
            res.send({ message: "true" });
        }).catch((err) => {
            console.log(err);
        })
      }
  }catch (err) {
    console.log(err);
  }
};



// LOGIN
module.exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await UserRegister.login(email, password);

        if(!user){
            return res.send({ message: "Invalid Credentials" });
        }else{
            const token = createToken(user._id);

            res.cookie("jwt", token, {
                path: "/",
                domain: "localhost",
                withCredentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000,
            });

            res.send({
                message: "true",
                id: user._id,
            });
        }

    }catch(err) {
        console.log(err);
    }
}