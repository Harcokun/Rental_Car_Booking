//const Car = require('../models/Car.js');
//const carProvider = require('../models/CarProvider.js');

//@desc     GET all cars
//@routes   GET /api/v1/cars
//@access   Public
exports.getCars = async (req, res, next) => {
    res.status(200).json({success: true, msg: 'Show all cars'});
};

//@desc     GET single cars
//@routes   GET /api/v1/cars/:id
//@access   Public
exports.getCar = async (req, res, next) => {
    res.status(200).json({success: true, msg: `Show car ${req.params.id}`});
};

//@desc     CREATE new car
//@routes   POST /api/v1/cars
//@access   Public
exports.createCar = async (req, res, next) => {
    res.status(200).json({success: true, msg: 'Create new car'});
};

//@desc     Update car
//@routes   PUT /api/v1/cars/:id
//@access   Public
exports.updateCar = async (req, res, next) => {
    res.status(200).json({success: true, msg: `Update car ${req.params.id}`});
};

//@desc     Delete car
//@routes   DELETE /api/v1/cars/:id
//@access   Public
exports.deleteCar = async (req, res, next) => {
    res.status(200).json({success: true, msg: `Delete car ${req.params.id}`});
};

//@desc     Get Car Provider
//@route    GET /api/v1/cars/CarProviders/
//@access   Public
// exports.getCarProviders = (req, res, next) => {
//     carProvider.getAll((err, data) => {
//         if(err)
//             res.status(500).send({
//                 message:
//                     err.message || 'Some error occured while retrieving Car Providers.'
//             });
//         else res.send(data);
//     });
// };