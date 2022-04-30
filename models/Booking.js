const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bookDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    carprovider: {
        type: mongoose.Schema.ObjectId,
        ref: 'CarProvider',
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);