const User = require("../models/user.model");
const { verifyPassword, Exception } = require("../utils/index");
const { statusCodes, env } = require("../config/globals");
const { generateAccessToken } = require("../utils/jwt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new Exception("username or password incorrect");
    const user = await User.findOne(
      { username },
      { createdAt: 0, updatedAt: 0, __v: 0 }
    );
    if (!user)
      throw new Exception(
        "username or password incorrect",
        statusCodes.NOT_FOUND
      );
    const isValidPassword = await verifyPassword(user.password, password);
    if (!isValidPassword)
      throw new Exception(
        "username or password incorrect",
        statusCodes.UNAUTHORIZED
      );
    delete user._doc.password;
    const token = await generateAccessToken(
      {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        phone: user.phone
      },
      env.JWT_SECRET_KEY,
      "1d"
    );
    return res.status(statusCodes.OK).send({
      user: { ...user._doc },
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    let { username, fullname, phone, email, password } = req.body;

    // check existed: username & email
    const [isExistedEmail, isExistedUsername, isExistedPhone] = await Promise.all([
      User.exists({ email }),
      User.exists({ username }),
      User.exists({ phone })
    ]);
    if (isExistedUsername) throw new Exception("UserName is existed");
    if (isExistedEmail) throw new Exception("Email is existed");
    if (isExistedPhone) throw new Exception("Phone is existed");

    const user = new User({
      username,
      fullname,
      phone,
      email,
      password,
    });
    await user.save();
    return res
      .status(statusCodes.OK)
      .send({ message: "register account successful" });
  } catch (error) {
    next(error);
  }
};
