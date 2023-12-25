const express = require('express');
const { getAllRestaurants, getRestaurantByName, getSpecificRestaurant, getRestaurantById, searchRestaurants } = require('../controllers/restaurant')
const router = express.Router()



router.get('/all', getAllRestaurants);

// get all restuarants by name
router.get('/all/:restaurantName', getRestaurantByName);

// get specific restaurant by Name
router.get('/:restaurantName', getSpecificRestaurant);

// get resaturant by ID
router.get('/find/:restaurantID', getRestaurantById);

// search query
router.get('/search/:restaurantName', searchRestaurants);

module.exports = router