const express = require("express");
const { protect } = require("../middleware/auth")
const { openThread, getThreads, createThread, renameThread, removeFromThread, addToThread } = require("../controllers/threadControllers")

const router = express.Router();

router.route('/').post(protect, openThread);
router.route('/').get(protect, getThreads);
router.route('/group').post(protect, createThread);
router.route('/rename').put(protect, renameThread);
router.route('/removemember').put(protect, removeFromThread);
router.route('/addmember').put(protect, addToThread);

module.exports = router