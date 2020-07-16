// const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     username: String,
//     googleid: String
// });

// const User = mongoose.model('user', userSchema);

// module.exports = User;

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('User', UserSchema)
