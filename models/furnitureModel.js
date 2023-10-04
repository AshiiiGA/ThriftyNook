const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    summary: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    category: { // Change 'catergory' to 'category'
        type: String,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    posted: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

module.exports = mongoose.model("furniture", furnitureSchema);