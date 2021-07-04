const { User } = require("../db/models");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "New user created" });
  } catch (error) {
    next(error);
  }
};
