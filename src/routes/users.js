const express = require('express');
const router = express.Router();
const User = require('../models/user')

//Insert new user
router.post('/add', async (req,res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email
    });
    
    await newUser.save()
        .then(() => res.json('User added!'))
        .catch(e => res.status(400).json('Error: '+e));
});

//Select all users
router.get('/', async (req,res) => {
    await User.find().select('username')
        .then(users => res.json(users))
        .catch(e => res.status(400).json('Error: '+e));
});


//Login
router.get('/login', async (req,res) =>{
    await User.find({username: req.query.username, password: req.query.password})
        .then(user => res.json(user))
        .catch(e => res.status(400).json('Error: '+e));
});

module.exports = router;