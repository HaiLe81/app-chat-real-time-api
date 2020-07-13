const { Schema, model } = require("mongoose");
const { String, Number } = Schema.Types;
const { hashPassword } = require("../utils/index");
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 30,
      minlength: 2,
    },
    fullname: {
      type: String,
      required: true,
      maxlength: 30,
      minlength: 2,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 11
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

module.exports = model("User", userSchema);
