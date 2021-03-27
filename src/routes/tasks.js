const express = require('express');
const router = express.Router();
const Task = require('../models/task')

//Insert new task
router.post('/add', async (req,res) => {
    const newTask = new Task({
        usernameId: req.body.usernameId,
        name: req.body.name,
        description: req.body.description,
        duration: Number(req.body.duration),
        importance: Number(req.body.importance),
        registration_date: new Date(),
        due_date: Date.parse(req.body.due_date)
    });
    
    await newTask.save()
        .then(() => res.json('Task added!'))
        .catch(e => res.status(400).json('Error: '+e));
});

//Select all tasks
router.get('/', async (req,res) => {
    await Task.find()
        .then(tasks => res.json(tasks))
        .catch(e => res.status(400).json('Error: '+e));
});

//Select all tasks by username
router.get('/:usernameId', async (req,res) => {
    await Task.find({usernameId: ObjectId(req.params.usernameId)})
        .then(tasks => res.json(tasks))
        .catch(e => res.status(400).json('Error: '+e));
});

//Select a tasks by id
router.get('/byId/:idTask', async (req,res) => {
    await Task.findById(req.params.idTask)
        .then(task => res.json(task))
        .catch(e => res.status(400).json('Error: '+e));
});

//Update a task
router.patch('/:idTask', async (req,res) => {
    await Task.updateOne(
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
router.delete('/:idTask', async (req,res) => {
    await Task.findByIdAndDelete(req.params.idTask)
        .then(() => res.json('Task deleted'))
        .catch(e => res.status(400).json('Error: '+e));
});

module.exports = router;