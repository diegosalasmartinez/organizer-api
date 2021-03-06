const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connection = mongoose.connection;
const cors = require('cors');
require('dotenv').config();   

//Middlewares
app.use(cors());
app.use(express.json());

//Settings
app.set('port',process.env.PORT || 5000);

//Routes
const usersRoute = require('./routes/users');
app.use('/users',usersRoute);
const tasksRoute = require('./routes/tasks');
app.use('/tasks',tasksRoute);

//Index
app.get('/', (req,res) => { res.send('It\'s alive!!!'); });

//Connect to de DB
mongoose.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
connection.once('open',() => console.log('Connected to MongoDB!'));

//Listen to the server
app.listen(app.get('port'), () => {
    console.log(`Server on http://localhost:${app.get('port')}`);
});