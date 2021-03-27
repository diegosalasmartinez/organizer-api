const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TaskSchema = Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    title: {
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
    due_date: {
        type: Date,
        required: true
    }
},{
    timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;