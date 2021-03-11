const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    importance: {
        type: Number,
        required: true
    },
    registration_date: {
        type: Date,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    }
},{
    timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;