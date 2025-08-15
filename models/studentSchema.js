const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    classGrade: {
      type: String,
      required: true,
      enum: ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"],
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const STUDENT = mongoose.model("student", studentSchema);
module.exports = STUDENT;
