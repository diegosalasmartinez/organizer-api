const express = require('express');
const router = express.Router();
const Task = require('../models/task')

//Insert new task
router.post('/add', (req,res) => {
    const newTask = new Task({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        duration: Number(req.body.duration),
        importance: Number(req.body.importance),
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

//Select all tasks by user
router.get('/:userId', (req,res) => {
    Task.find({userId: req.params.userId})
        .then(tasks => res.json(tasks))
        .catch(e => res.status(400).json('Error: '+e));
});

//Select a tasks by id
router.get('/byId/:idTask', (req,res) => {
    Task.findById(req.params.idTask)
        .then(task => res.json(task))
        .catch(e => res.status(400).json('Error: '+e));
});

//Update a task
router.patch('/:idTask', (req,res) => {
    Task.updateOne(
        {_id: req.params.idTask}, 
        {$set: {
            title: req.body.name, 
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