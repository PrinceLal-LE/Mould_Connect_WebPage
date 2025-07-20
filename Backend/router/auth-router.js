const express = require('express');
const authcontroller = require('../controller/auth-controller');
const router = express.Router();

// router.get('/', (req, res) => {
//     res.status(200).send("User Authenticated Successfully");
// });

router.route('/').get(authcontroller.home);

router.route('/register').post(authcontroller.register);
router.route('/login').post(authcontroller.login);
module.exports = router;