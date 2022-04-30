const Booking = require('../models/Booking');
const CarProvider = require('../models/CarProvider');

//@desc     Get all bookings
//@desc     GET /api/v1/bookings
//@access   Public
exports.getBookings = async (req, res, next) => {
    let query;
    //General users can see only their appointments!
    if(req.user.role !== 'admin') {
        query = Booking.find({user: req.user.id}).populate({
            path: 'carprovider',
            select: 'name province tel'
        });
    }
    //If you are an admin, you can see all!
    else {
        //populate car provider information in booking
        if(req.params.carproviderId) {
            query = Booking.find({carprovider:req.params.carproviderId}).populate({
                path: 'carprovider',
                select: 'name province tel'
            });
        }
        else {
            query = Booking.find().populate({
                path: 'carprovider',
                select: 'name province tel'
            });
        }
    }
    try {
        const bookings = await query;

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Cannot find Booking'});
    }
};

//@desc     Get single booking
//@desc     GET /api/v1/bookings/:id
//@access   Public
exports.getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate({
            path: 'carprovider',
            select: 'name description tel'
        });

        if(!booking) {
            return res.status(404).json({
                success: false,
                message: `No booking with the id of ${req.params.id}`});
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Cannot find Booking'
        });
    }
};

//@desc     Add booking
//@desc     POST /api/v1/carproviders/:carproviderId/booking
//@access   Private
exports.addBooking = async (req, res, next) => {
    try {
        req.body.carprovider = req.params.carproviderId;

        const carprovider = await CarProvider.findById(req.params.carproviderId);

        if(!carprovider) {
            return res.status(404).json({
                success: false,
                message: `No carprovider with the id of ${req.params.carproviderId}`
            });
        }

        //add user Id to req.body
        req.body.user = req.user.id

        //Check for existed booking
        const existedBookings = await Booking.find({user: req.user.id});
        
        //If the user is not an admin, they can only create 3 appointments.
        if(existedBookings.length >= 3 && req.user.role !== 'admin') {
            return res.status(400).json({
                success: false,
                message: `The user with ID ${req.user.id} has already made 3 bookings`
            });
        }
        const booking = await Booking.create(req.body);

        res.status(200).json({
            success: true,
            data: booking
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Cannot create Booking'
        });
    }
};

//@desc     Update booking
//@desc     PUT /api/v1/bookings/:id
//@access   Private
exports.updateBooking = async (req, res, next) => {
    try {
        let booking = await Booking.findById(req.params.id);

        if(!booking) {
            return res.status(404).json({
                success: false,
                message: `No booking with the id of ${req.params.id}`
            });
        }

        //Make sure user is the booking owner
        if(booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to update this booking`
            });
        }

        booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: booking
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Cannot update Booking'
        });
    }
};

//@desc     Delete booking
//@desc     DELETE /api/v1/bookings/:id
//@access   Private
exports.deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if(!booking) {
            return res.status(404).json({
                success: false,
                message: `No booking with the id of ${req.params.id}`
            });
        }

        //Make sure user is the booking owner
        if(booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: `User ${req.user.id} is not authorized to delete this bootcamp`
            });
        }
        await booking.remove();

        res.status(200).json({
            success: true,
            data: {}
        });
    }  
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Cannot delete Booking'
        });
    }
};