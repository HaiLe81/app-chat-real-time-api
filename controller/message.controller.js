const Channel = require("../models/channel.model");
const Message = require("../models/message.model");
const { Exception } = require("../utils/index");
const { statusCodes } = require("../config/globals");

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { channel, author, message } = req.body;
    if (!channel || !author || !message)
      return new Exception("Channel, Author or Message is required");
    const mess = new Message({
      channel,
      author,
      message,
    });
    await mess.save();

    return res.status(statusCodes.OK).send({
      mess,
      message: "Send Message Success!",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getMessageByChannelId = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    if (!channelId) throw new Exception("ChannelId Is Required!");
    const messages = await Message.find({ channel: channelId })
      .populate("author", ["fullname", "username"])
      .sort({ createdAt: 1 });
    if (!messages) throw new Exception("Don't have a messages");
    return res
      .status(statusCodes.OK)
      .json({ messages, message: "Get Messages By Channel Success!" });
  } catch (err) {
    next(err);
  }
};
