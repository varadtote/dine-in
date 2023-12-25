const Restaurant = require("../models/Restaurant");

//get all Restaurants in Database
async function getAllRestaurants(req, res) {
    const allHotels = await Restaurant.find()
    console.log(allHotels)
    return res.send(allHotels)
}

// get all restuarnts by name
async function getRestaurantByName(req, res) {
    try {
        const queryHotel = req.params.restaurantName;
        console.log(queryHotel)

        // Use RegExp for case-insensitive partial match
        const regex = new RegExp(queryHotel, 'i');

        // Find all restaurants that include the specified name
        const restaurants = await Restaurant.find({ restaurantName: regex });

        if (restaurants.length === 0) {
            return res.status(404).send('No restaurants found with the specified name');
        }

        return res.send(restaurants);
    } catch (error) {
        console.error('Error retrieving restaurants by name:', error);
        return res.status(500).send('Internal Server Error');
    }
}


async function getSpecificRestaurant(req, res) {
    console.log(req.params.restaurantName);
    try {
        const restaurantName = req.params.restaurantName;

        // Use the correct field name in the query
        const restaurant = await Restaurant.findOne({ restaurantName });

        if (!restaurant) {
            return res.status(404).send("Restaurant not Found");
        }

        console.log(restaurantName);
        return res.send(restaurant);
    } catch (error) {
        console.error('Error retrieving specific restaurant:', error);
        return res.status(500).send('Internal Server Error');
    }
}


async function getRestaurantById(req, res) {
    console.log(req.params.restaurantID);
    try {
        const restaurantID = req.params.restaurantID;

        // Use the correct field name in the query
        const restaurant = await Restaurant.findById(restaurantID);

        if (!restaurant) {
            return res.status(404).send("Restaurant not Found");
        }

        console.log(restaurant);
        return res.send(restaurant);
    } catch (error) {
        console.error('Error retrieving specific restaurant:', error);
        return res.status(500).send('Internal Server Error');
    }
}

async function searchRestaurants(req, res) {
    try {
        // Extract query parameters from the request
        const { restaurantName, location, cuisine } = req.query;

        // Define a query object to filter based on provided parameters
        const query = {};

        // Add conditions for the parameters that are present in the request
        if (restaurantName) {
            query.restaurantName = new RegExp(restaurantName, 'i');
        }

        if (location) {
            query.address = new RegExp(location, 'i');
        }

        if (cuisine) {
            query.cuisine = new RegExp(cuisine, 'i');
        }

        // Perform the search using the constructed query
        const restaurants = await Restaurant.find(query);

        if (restaurants.length === 0) {
            return res.status(404).send('No restaurants found with the specified criteria');
        }

        return res.send(restaurants);
    } catch (error) {
        console.error('Error searching for restaurants:', error);
        return res.status(500).send('Internal Server Error');
    }
}



module.exports = { getAllRestaurants, getRestaurantByName, getSpecificRestaurant, getRestaurantById, searchRestaurants }