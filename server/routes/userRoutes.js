const express = require('express')
const { registerUser, authUser, allUsers } = require('../controllers/userControllers')
const { protect } = require('../middleware/auth')

const router = express.Router();

router.post("/login", authUser);
router.route("/").post(registerUser);
router.route("/").get(protect, allUsers);


module.exports = router