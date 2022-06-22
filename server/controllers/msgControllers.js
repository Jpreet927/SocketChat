const asyncHandler = require("express-async-handler");
const Thread = require("../Models/chatModel");
const Message = require("../Models/msgModel");
const User = require("../Models/userModel");

const sendMsg = asyncHandler(async (req, res) => {
    const { msgContent, threadId } = req.body;
    if (!msgContent || !threadId) {
        console.log("Invalid message data in request");
        return res.sendStatus(400);
    }

    let newMsg = {
        sender: req.user._id,
        content: msgContent,
        thread: threadId
    };

    try {
        let message = await Message.create(newMsg);
        message = await message.populate("sender", "name");
        message = await message.populate("thread");
        message = await User.populate(message, {
            path: "thread.users",
            select: "name email"
        });

        await Thread.findByIdAndUpdate(req.body.threadId, {
            latestMsg: message,
        });

        res.json(message);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const allMsg = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ thread: req.params.threadId }).populate("sender", "name email").populate("thread");

        res.json(messages)
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

module.exports = { sendMsg, allMsg }