const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer')

//Populate de DB with random values
router.post('/populateDB', async (req,res) => {
    let customer;
    let firstName, lastName, email, phone;

    for (let i = 1; i <= 100000; i++) {    
        firstName = "oherfirstname" + i;
        lastName = "otherlastname" + i;
        email = "otheremail" + i + "@gmail.com";
        phone = Math.floor(Math.random() * (999999998 + 1));
        
        customer = new Customer({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        });
        
        try{
            const savedCustomer = await customer.save();
            // res.json(savedCustomer);
        }
        catch(e){
            console.log(e);
        }
    }
});

//Insert new customer
router.post('/', async (req,res) => {
    const customer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
    });
    
    try{
        const savedCustomer = await customer.save();
        res.json(savedCustomer);
    }
    catch(e){
        res.json({message: e});
    }
});

//Select all customers
router.get('/', async (req,res) => {
    try{
        const customers = await Customer.find();
        res.json(customers);
    }
    catch(e){
        res.json({message: e});
    }
});

//Select customers paginated
router.get('/paginated', paginatedResults(Customer), (req, res) => {
    res.json(res.paginatedResults);
});

function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const results = {};
    
        if (endIndex < await model.countDocuments()) {
            results.next = { page: page + 1, limit: limit }
        }
        if (startIndex > 0) {
            results.previous = { page: page - 1, limit: limit }
        }

        try {
            results.content = await model.find().limit(limit).skip(startIndex);
            results.count = await model.countDocuments();
            res.paginatedResults = results;
            next();
        } 
        catch (e) {
            res.json({message: e});
        }
    }
}
  
//Update a customer
router.patch('/:idCustomer', async (req,res) => {
    try{
        const updatedCustomer = await Customer.updateOne({_id: req.params.idCustomer}, {$set: 
            {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, phone: req.body.phone}});
        res.json(updatedCustomer);
    }
    catch(e){
        res.json({message: e});
    }
})

//Delete a customer
router.delete('/:idCustomer', async (req,res) => {
    try{
        const deletedCustomer = await Customer.remove({_id: req.params.idCustomer});
        res.json(deletedCustomer);
    }
    catch(e){
        res.json({message: e});
    }
});

module.exports = router;