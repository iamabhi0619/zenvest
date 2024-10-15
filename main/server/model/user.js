const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  name: String,
  email: String,
  dateofjoining: Date,
  gender: String,
  number: Number,
  course: String,
  courseYear: {
    type: String,
    default: "1st Year"
  },
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
  remarks: {
    type: String,
    default: ""
  }
});

const User = mongoose.model('New-Registration', userSchema);

module.exports = User;
