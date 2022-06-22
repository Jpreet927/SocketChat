const mongoose = require('mongoose')

const threadModel = mongoose.Schema(
    {
        threadName: {
            type: String, 
            trim: true
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        isGroup: {
            type: Boolean, 
            default: false
        },
        latestMsg: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true, 
    }
);

const Thread = mongoose.model("Thread", threadModel);

module.exports = Thread