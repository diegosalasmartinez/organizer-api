const express = require('express');
const router = express.Router();
const User = require('../models/user')

//Insert new user
router.post('/add', (req,res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(e => res.status(400).json('Error: '+e));
});

//Select all users
router.get('/', (req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(e => res.status(400).json('Error: '+e));
});

router.get('/login/:username/:password', (req,res) =>{
    User.find({username: req.params.username, password: req.params.password}).exec()
        .then(user => res.json(user))
        .catch(e => res.status(400).json('Error: '+e));
});

module.exports = router;