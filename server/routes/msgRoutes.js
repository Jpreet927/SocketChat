const express = require("express")
const { sendMsg, allMsg } = require("../controllers/msgControllers")
const { protect } = require("../middleware/auth")

const router = express.Router();
router.route('/').post(protect, sendMsg);
router.route('/:threadId').get(protect, allMsg);

module.exports = router