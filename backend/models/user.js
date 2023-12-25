const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    item: { type: String, required: true },
    qty: { type: Number, required: true }
});

const orderHistorySchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    orderedBy: { type: String, required: true },
    orderItems: [orderItemSchema],
    date: { type: Date, required: true },
    status: { type: String, enum: ['completed', 'failed', 'processing'], required: true },
    totalPrice: { type: Number, required: true },
    extraNote: { type: String }
});

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['CUSTOMER', 'ADMIN', 'OWNER'],
        default: 'CUSTOMER'
    },
    orderHistory: {
        type: [orderHistorySchema],
        default: null
    },
    accountBalance: {
        type: "Number",
        default: 1000
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
