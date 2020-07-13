const Channel = require("../models/channel.model");
const { Exception } = require("../utils/index");
const { statusCodes } = require("../config/globals");

module.exports.checkUserJoinedChannel = async (req, res, next) => {
  try {
    const { id, channelId } = req.params;
    if (!id) throw new Exception("Id Or ChannelId Is Required!");
    const channel = await Channel.findById({_id: channelId});
    if (!channel) throw new Exception("Not Found", statusCodes.NOT_FOUND);
    //check joined
    const existUser = channel.member.find(
      (item) => item.toHexString() === id
    );
    if (existUser) throw new Exception("User Joined", statusCodes.BAD_REQUEST);
    return res
      .status(statusCodes.OK)
      .send({ message: "User Don't Join Channel" });
  } catch (error) {
    next(error);
  }
};
