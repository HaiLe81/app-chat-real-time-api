const User = require("../models/user.model");
const { verifyPassword, Exception } = require("../utils/index");
const { statusCodes, env } = require("../config/globals");
const { generateAccessToken } = require("../utils/jwt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Exception("username or password incorrect");
    const user = await User.findOne({ username }, { createdAt: 0, updatedAt: 0, __v: 0 })
    if (!user) throw new Exception("username or password incorrect",statusCodes.NOT_FOUND);
    const isValidPassword = await verifyPassword(user.password, password);
    if (!isValidPassword) throw new Exception("username or password incorrect",statusCodes.UNAUTHORIZED);
    delete user._doc.password;
    const token = await generateAccessToken(
      {
        _id: user._id,
        username: user.username,
        fullname: user.fullname
      },
      env.JWT_SECRET_KEY,"1d");
    return res.status(statusCodes.OK).send({ 
      user: {...user._doc}, 
      token });
  } catch (err) {
    next(err);
  }
};
