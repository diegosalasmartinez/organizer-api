const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    }
},{
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;