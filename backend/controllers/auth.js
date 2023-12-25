const bcrypt = require('bcrypt');
const User = require("../models/User");
const Restaurant = require('../models/Restaurant')
const jwt = require('jsonwebtoken');


async function signupController(req, res) {
    const body = req.body;

    try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = new User({
            userName: body.userName,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hashedPassword, // Save the hashed password
        });

        await newUser.save();

        return res.send('User Created');
    } catch (error) {
        console.error("Error creating user 👙:", error);
        return res.status(500).send('Internal Server Error');
    }
}


// Function to create a JWT token
function generateToken(userId) {
    const secretKey = 'your_secret_key'; // Replace with a strong secret key
    const expiresIn = '1h'; // Token expiration time, e.g., 1 hour
    return jwt.sign({ userId }, secretKey, { expiresIn });
}

async function loginController(req, res) {
    const { userName, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ userName });

        // Check if the user exists
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Check if the passwords match
        if (!passwordMatch) {
            return res.status(401).send('Invalid username or password');
        }

        // Passwords match, so the login is successful
        // Generate a JWT token
        const token = generateToken(user._id);

        res.status(200).json({ token });
        return res.redirect('/restaurant')
        // Send the token in the response
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send('Internal Server Error');
    }
}


async function ownerLoginController(req, res) {

    const body = req.body
    const email = body.email
    const password = body.password
    console.log("body", body)
    let restaurantOwner = await Restaurant.findOne({ email });

    if (!restaurantOwner) return res.send("User Not Found")

    if (password == restaurantOwner.password) {

        return res.send({ "msg": "Sucessfull Login", "restaurant": restaurantOwner.restaurantName })
    }
    return res.send("Invalid Credentials")
}

async function ownerSignupController(req, res) {
    const body = req.body
    console.log(" received body", body)
    try {
        const newResturant = new Restaurant({
            restaurantName: body.restaurantName,
            email: body.email,
            password: body.password,
            phone: body.phone,
            address: body.address
        })
        console.log("respimse", res)
        await newResturant.save();
        return res.status(200).send('Restaurant Registred');
    } catch (error) {
        return console.log('Error in Owner Signup', error)
    }
}

module.exports = { ownerSignupController, ownerLoginController, signupController, loginController };


