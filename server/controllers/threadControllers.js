const asyncHandler = require("express-async-handler")
const Thread = require("../Models/chatModel");
const User = require("../Models/userModel");

const openThread = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("Id not in request");
        return res.sendStatus(400);
    }

    let isThread = await Thread.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    }).populate("users", "-password").populate("latestMsg");

    isThread = await User.populate(isThread, {
        path: "latestMsg.sender",
        select: "name email",
    })

    if (isThread.length > 0) {
        res.send(isThread[0]);
    } else {
        let threadData = {
            threadName: "sender",
            isGroup: false,
            users: [req.user._id, userId],
        }

        try {
            const createdThread = await Thread.create(threadData);
            const fullThread = await Thread.findOne({ _id: createdThread._id }).populate("users", "-password");

            res.status(200);
            res.send(fullThread);
        } catch(err) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})

const getThreads = asyncHandler(async (req, res) => {
    try {
        Thread.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("admin", "-password")
            .populate("latestMsg")
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                result = await User.populate(result, {
                    path: "latestMsg.sender",
                    select: "name email"
                });

            res.status(200).send(result);
        })
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
})


const createThread = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name){
        return res.status(400).send({ message: "Please fill all fields" });
    }

    let users = JSON.parse(req.body.users)
    users.push(req.user);

    if (users.length <= 2) {
        res.status(400);
        return res.send("Please provide more than 2 members to create a group.");
    }

    

    try {
        const group = await Thread.create({
            threadName: req.body.name,
            users: users,
            isGroup: true,
            admin: req.user
        });

        const fullGroup = await Thread.findOne({ _id: group._id })
            .populate("users", "-password")
            .populate("admin", "-password");
        
        res.status(200).json(fullGroup);

    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
})

const renameThread = asyncHandler(async (req, res) => {
    const { id, threadName } = req.body;

    const updatedName = await Thread.findByIdAndUpdate(id, { threadName: threadName }, { new: true })
        .populate("users", "-password")
        .populate("admin", "-password");
    
    if (updatedName) {
        res.json(updatedName);
    } else {
        res.status(404);
        throw new Error("Group not found");
    }
});

const addToThread = asyncHandler(async (req, res) => {
    const { threadId, userId } = req.body;

    const userAdded = await Thread.findByIdAndUpdate(threadId, { $push: { users: userId } }, { new: true })
        .populate("users", "-password")
        .populate("admin", "-password");
    
    if (userAdded) {
        res.json(userAdded);
    } else {
        res.status(404);
        throw new Error("Group not found")
    }
})

const removeFromThread = asyncHandler(async (req, res) => {
    const { threadId, userId } = req.body;

    const userRemoved = await Thread.findByIdAndUpdate(threadId, { $pull: { users: userId } }, { new: true })
        .populate("users", "-password")
        .populate("admin", "-password");
    
    if (userRemoved) {
        res.json(userRemoved);
    } else {
        res.status(404);
        throw new Error("Group not found")
    }
})

module.exports = { openThread, getThreads, createThread, renameThread, removeFromThread, addToThread }