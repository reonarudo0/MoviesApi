const {Movie,validate} = require('../models/movie');
const _ = require('lodash');
const express =  require('express');
const router = express.Router();

router.get('/', async(req,res)=>{
    res.send(await Movie.find().sort({name:1}).select({name:1,genre:1,rentalValue:1,sellValue:1,numberInStock:1}));
})

module.exports = router;