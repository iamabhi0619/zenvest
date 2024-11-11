const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  number: { type: String, required: true },
  dp: { type: String },
  regNumber: { type: String, required: true, unique: true },
  regDate: { type: Date, default: Date.now },
  attendance: [{
    day: { type: String, enum: ['day1', 'day2'], required: true },
    date: { type: Date, default: Date.now },
    scannedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true } 
  }],
  payment: {
    orderId: { type: String, required: true },
    paymentId: { type: String },
    signature: { type: String },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed', 'captured'], default: 'Pending' },
    amount: { type: Number, required: true }
  }
});

const Finathone = mongoose.model('Finathon1.0-User', userSchema);

module.exports = {Finathone}
