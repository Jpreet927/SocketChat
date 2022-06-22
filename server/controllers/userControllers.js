const asyncHandler = require("express-async-handler");
const createToken = require("../config/createToken")
const User = require("../Models/userModel")


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, profilePic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill out each field.");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("This email is already registered");
    }

    const newUser = await User.create({
        name, 
        email, 
        password,
        profilePic,
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profilePic: newUser.profilePic,
            token: createToken(newUser._id)
        });
    } else {
        res.status(400);
        throw new Error("Could not create user")
    }
});


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const registeredUser = await User.findOne({ email });

    if (registeredUser && (await registeredUser.matchPassword(password))) {
        res.json({
            _id: registeredUser._id,
            name: registeredUser.name,
            email: registeredUser.email,
            profilePic: registeredUser.ProfilePic,
            token: createToken(registeredUser._id)
        });
    } else {
        res.status(401);
        throw new Error("Incorrect credentials.")
    }
});


const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search 
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        } : {};
    
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
})

module.exports = { registerUser, authUser, allUsers }