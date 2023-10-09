const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    card_number: {
        type: String,
        required: true,
    },
    ex_date: {
        type: String,
        required: true,
    },
    CVC: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    mover: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("payment", paymentSchema);