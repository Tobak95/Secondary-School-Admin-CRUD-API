const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please provide your email address"],
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    phoneNumber: {
      type: String,
      unique: true,
      match: [/^\+?[0-9]{7,15}$/, "Please provide a valid phone number"],
      required: [true, "Please provide your phone number"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    password: {
      type: String,
      minLength: [true, "Password is required"],
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

const USER = mongoose.model("user", userSchema);
module.exports = USER;
