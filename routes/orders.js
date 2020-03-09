const userAuthorization = require('../middleware/userAuthorization');
const roleAuthorization = require('../middleware/roleAuthorization');
const {Order,validate} = require('../models/order');
const {User} = require('../models/user');
const {Movie} = require('../models/movie');
const express = require('express');
const router = express.Router();


router.post('/',[userAuthorization,roleAuthorization(['Customer','Employee','Admin'])],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.message);

    const user = await User.findById(req.body.customerId);
    if(!user) return res.status(404).send('User not found.');

    const operation = req.body.operation;       
    let totalPrice = 0;
    let moviesList = [];
    await Promise.all((req.body.movies).map(async element =>{
        let movie = await Movie.findById(element);        
        if(!movie) return res.status(404).send('Movie not found.');    
        moviesList.push(movie);        
        if(operation === 'Rental') totalPrice = totalPrice + movie.rentalValue;
        else totalPrice = totalPrice + movie.sellValue;
    }));    
    
    let order = new Order({
        customer:{name:user.name,email:user.email},
        movies: moviesList,
        price: totalPrice,
        operation: operation,
    }); 
    
    await order.save();
    res.send(order);
});

module.exports = router;
