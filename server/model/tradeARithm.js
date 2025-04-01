const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    number: { type: String, required: true },
    regNumber: { type: String, required: true, unique: true },
    regDate: { type: Date, default: Date.now },
    ticketUrl: { type: String, default: null },
    course: { type: String },
    year: { type: Number },
    attendance: [{
        date: { type: Date, required: true },
        slot: { type: String, enum: ['Morning', 'Afternoon'], required: true }
    }],
    payment: {
        orderId: { type: String, required: true },
        paymentId: { type: String },
        signature: { type: String },
        currency: { type: String, default: 'INR' },
        status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
        amount: { type: Number, required: true }
    }
});
const Workshop = mongoose.model('workshop-User', userSchema);
module.exports = { Workshop }
