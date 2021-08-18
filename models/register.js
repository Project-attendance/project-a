const mongoose = require("mongoose");
const validator = require("validator");

const dataschema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    require: true,
    max: 255,
    min: 6,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
      isAsync: false,
    },
  },

  password: {
    type: String,
    require: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating  model now
module.exports = mongoose.model("User", dataschema);
