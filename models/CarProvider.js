const mongoose = require('mongoose');
const CarProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a rental car provider name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    district: {
        type: String,
        required: [true, 'Please add a district']
    },
    province: {
        type: String,
        required: [true, 'Plase add a province']
    },
    postalcode: {
        type: String,
        required: [true, 'Please add a postalcode'],
        maxlength: [5, 'Postal code can not be more than 5 digits']
    },
    tel: {
        type: String
    },
    region: {
        type: String,
        required: [true, 'Please add a region']
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

//Cascade delete appointments when a car provider is deleted
CarProviderSchema.pre("remove", async function (next) {
    console.log(`Bookings being removed from car provider ${this._id}`);
    await this.model("Booking").deleteMany({ car: this._id });
    next();
});

//Reverse populate with virtuals
CarProviderSchema.virtual('bookings', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'carprovider',
    justOne: false
});

module.exports = mongoose.model('CarProvider', CarProviderSchema);