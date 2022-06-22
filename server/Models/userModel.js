const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            default: "https://i.pinimg.com/564x/2a/40/6b/2a406bf58db22cc7818ad1ff48c158cf.jpg",
        }
    },
    {
        timestamps: true
    }
);

// encrypt password
userModel.pre('save', async function(next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userModel.methods.matchPassword = async function(passwordInput) {
    return await bcrypt.compare(passwordInput, this.password)
}

const User = mongoose.model("User", userModel);

module.exports = User