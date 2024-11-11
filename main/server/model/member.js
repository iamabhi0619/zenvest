const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  post:{
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  socialLinks: [{
    type: String
  }],
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = { Member };
