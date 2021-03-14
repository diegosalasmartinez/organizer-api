const express = require('express');
const router = express.Router();
const Task = require('../models/task')

//Insert new task
router.post('/add', (req,res) => {
    const newTask = new Task({
        username: req.body.username,
        name: req.body.name,
        description: req.body.description,
        duration: Number(req.body.duration),
        importance: Number(req.body.importance),
        registration_date: new Date(),
        due_date: Date.parse(req.body.due_date)
    });
    
    newTask.save()
        .then(() => res.json('Task added!'))
        .catch(e => res.status(400).json('Error: '+e));
});

//Select all tasks
router.get('/', (req,res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(e => res.status(400).json('Error: '+e));
});

//Select all tasks by username
router.get('/:username', (req,res) => {
    Task.find({username: req.params.username})
        .then(tasks => res.json(tasks))
        .catch(e => res.status(400).json('Error: '+e));
});

//Update a task
router.patch('/:idTask', (req,res) => {
    Task.updateOne(
        {_id: req.params.idTask}, 
        {$set: {
            name: req.body.name, 
            description: req.body.description, 
            duration: req.body.duration, 
            importance: req.body.importance, 
            due_date: req.body.due_date
        }})
        .then(() => res.json('Task updated!'))
        .catch(e => res.status(400).json('Error: '+e));
})

//Delete a task
router.delete('/:idTask', (req,res) => {
    Task.findByIdAndDelete(req.params.idTask)
        .then(() => res.json('Task deleted'))
        .catch(e => res.status(400).json('Error: '+e));
});

module.exports = router;