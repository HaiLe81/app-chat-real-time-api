const { Schema, model } = require("mongoose");
const { String, ObjectId } = Schema.Types;

const messageSchema = new Schema(
  {
    channel: {
        type: ObjectId,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true,
        min: [1, 'Message cannot be a space'],
        max: [255, 'The message is too long']
    }
  },
  { timestamps: true }
);


module.exports = model("Message", messageSchema);
