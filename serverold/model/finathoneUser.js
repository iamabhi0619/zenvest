const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  number: { type: String, required: true },
  dp: { type: String },
  regNumber: { type: String, required: true, unique: true },
  regDate: { type: Date, default: Date.now },
  attendance: [{
    date: { type: Date, required: true },
    slot: { type: String, enum: ['Morning', 'Afternoon'], required: true }
  }],
  payment: {
    orderId: { type: String, required: true },
    paymentId: { type: String },
    signature: { type: String },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    amount: { type: Number, required: true }
  }
});

const Finathone = mongoose.model('Finathon1.0-User', userSchema);

module.exports = {Finathone}
