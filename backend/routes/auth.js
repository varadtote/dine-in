const express = require('express');
const router = express.Router()

const { signupController } = require('../controllers/auth');
const { loginController } = require('../controllers/auth');
const { ownerSignupController } = require('../controllers/auth');
const { ownerLoginController } = require('../controllers/auth');



router.post('/signup', signupController);
router.post('/login', loginController);

router.post('/ownerlogin', ownerLoginController)
router.post('/ownersignup', ownerSignupController)

module.exports = router