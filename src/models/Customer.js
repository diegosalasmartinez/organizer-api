const mongoose = require('mongoose');
const Schema = mongoose.mongoose.Schema;

const CustomerSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Customers', CustomerSchema);