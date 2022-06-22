const mongoose = require('mongoose')

const msgModel = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        content: {
            type: String,
            trim: true
        },
        thread: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", msgModel);

module.exports = Message