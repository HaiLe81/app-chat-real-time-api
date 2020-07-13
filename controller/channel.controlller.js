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
      message: "Add Channel Success!",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChannels = async (req, res, next) => {
  try {
    const channels = await Channel.find();
    if (!channels) throw new Exception("Don't have a channel");
    return res
      .status(statusCodes.OK)
      .json({ channels, message: "Get Channels Success!" });
  } catch (err) {
    next(err);
  }
};

module.exports.joinChannel = async (req, res, next) => {
  try {
    const { memberId, channelId } = req.body;
    if (!memberId) throw new Exception("MemberId Or ChannelId Is Required!");
    const channel = await Channel.findById(channelId);
    if (!channel) throw new Exception("Not Found", statusCodes.NOT_FOUND);
    channel.member.push(memberId);
    await channel.save();
    return res
      .status(statusCodes.OK)
      .json({ message: "User Join Channel Success!" });
  } catch (err) {
    next(err);
  }
};

module.exports.getChannelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findById(id);
    if (!channel) throw new Exception("Not Found Channel");
    return res
      .status(statusCodes.OK)
      .json({ channel, message: "Get channel Success!" });
  } catch (err) {
    next(err);
  }
};
