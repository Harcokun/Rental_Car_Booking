const CarProvider = require('../models/CarProvider.js');

//@desc     GET all car providers
//@routes   GET /api/v1/carproviders
//@access   Public
exports.getCarProviders = async (req, res, next) => {
    try {
        const carproviders = await CarProvider.find();

        res.status(200).json({success: true, count: carproviders.length, data: carproviders});
    } 
    catch(err) {
        res.status(400).json({success: false});
    }
};

//@desc     GET single car providers
//@routes   GET /api/v1/carproviders/:id
//@access   Public
exports.getCarProvider = async (req, res, next) => {
    try {
        const carprovider = await CarProvider.findById(req.params.id);
        if(!carprovider) {
            return res.status(400).json({success: false});
        }
        res.status(200).json({success: true, data: carprovider});
    }
    catch(err) {
        res.status(400).json({success: false});
    }
};

//@desc     CREATE new car provider
//@routes   POST /api/v1/carproviders
//@access   Public
exports.createCarProvider = async (req, res, next) => {
    // console.log(req.body);
    // res.status(200).json({success: true, msg: 'Create new car provider'});

    const carprovider = await CarProvider.create(req.body);
    res.status(201).json({
        success: true,
        data: carprovider
    });
};

//@desc     Update car provider
//@routes   PUT /api/v1/carproviders/:id
//@access   Public
exports.updateCarProvider = async (req, res, next) => {
    try {
        const carprovider = await CarProvider.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        if(!carprovider) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: carprovider});
    }
    catch(err) {
        res.status(400).json({success: false});
    }
};

//@desc     Delete car provider
//@routes   DELETE /api/v1/carproviders/:id
//@access   Public
exports.deleteCarProvider = async (req, res, next) => {
    try {
        const carproviders = await CarProvider.findById(req.params.id);
        
        if(!carproviders) {
            return res.status(400).json({
                success: false,
                message: `Bootcamp not found with id of ${req.params.id}`});
        }

        carproviders.remove();
        res.status(200).json({success: true, data: {}});
    }
    catch(err) {
        res.status(400).json({success: false});
    }
};