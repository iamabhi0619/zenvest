const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  name: String,
  email: String,
  gender: String,
  course: String,
  courseYear: String,
  dateOfReg: {
    type: Date,
    default: Date.now
  },
  isChecked: {
    type: Boolean,
    default: false
  },
  DateOfEntry: {
    type: Date,
    default: ""
  }
});

const collab = mongoose.model('collab', userSchema);

module.exports = collab;
