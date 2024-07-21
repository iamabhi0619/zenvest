const mongoose = require("mongoose");
const { Schema } = mongoose;

const newRegSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  dateofbirth: Date,
  gender: String,
  number: Number,
  type: String,
  interest: String,
  date: {
    type: Date,
    default: Date.now
  },
  userimg: String,
  work: String,
});

exports.newReg = mongoose.model('New-Registration',newRegSchema)
