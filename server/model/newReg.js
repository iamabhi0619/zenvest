const mongoose = require("mongoose");
const { Schema } = mongoose;

const newRegSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  email: String,
  dateofbirth: Date,
  gender: String,
  number: Number,
  course: String,
  interest: String,
  date: {
    type: Date,
    default: Date.now
  },
  userimg: String,
  work: String,
  status: {
    type: String,
    default: "1"
  },
  remarks : {
    type: String,
    default: ""
  }
});

exports.newReg = mongoose.model('New-Registration',newRegSchema)
