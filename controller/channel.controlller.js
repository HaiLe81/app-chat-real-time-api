const Channel = require("../models/channel.model");
const { Exception } = require("../utils/index");
const { statusCodes } = require("../config/globals");

module.exports.createChannel = async (req, res, next) => {
  try {
    const { name, author } = req.body;
    if (!name || !author) return new Exception("Name or author is required");
    const channel = new Channel({
      name,
      author,
    });
    await channel.save();

    return res.status(statusCodes.OK).send({
      channel,
      message: "Add Channel Success!"
    });
  } catch (err) {
    next(err);
  }
};
