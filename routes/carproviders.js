const express = require('express');
const {getCarProviders, getCarProvider, createCarProvider, updateCarProvider, deleteCarProvider} = require('../controllers/carproviders');

const router = express.Router();

//router.route('/carProviders').get(getCarProviders);
router.route('/').get(getCarProviders).post(createCarProvider);
router.route('/:id').get(getCarProvider).put(updateCarProvider).delete(deleteCarProvider);

module.exports = router;