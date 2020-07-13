const { Schema, model } = require("mongoose");
const { String, ObjectId } = Schema.Types;

const channelSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    member: [{
        type: ObjectId,
        ref: 'User'
    }]
  },
  { timestamps: true }
);


module.exports = model("Channel", channelSchema);
