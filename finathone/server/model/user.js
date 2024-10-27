const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  number: { type: String, required: true },
  regNumber: { type: String, required: true, unique: true },
  regDate: { type: Date, default: Date.now },
  attendance: [{
    date: { type: Date, required: true },
    slot: { type: String, enum: ['Morning', 'Afternoon'], required: true }
  }]
});

module.exports = mongoose.model('User', userSchema);
