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
    
    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (e) {
        res.json('Error: '+e)
    }    
});

//Select all users
router.get('/', (req,res) => {
    User.find().select('username')
        .then(users => res.json(users))
        .catch(e => res.status(400).json('Error: '+e));
});


//Login
router.get('/login', (req,res) =>{
    User.find({username: req.query.username, password: req.query.password})
        .then(user => res.json(user))
        .catch(e => res.status(400).json('Error: '+e));
});

module.exports = router;