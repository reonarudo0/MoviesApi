const {Movie,validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const userAuthorization = require('../middleware/userAuthorization');
const roleAuthorization = require('../middleware/roleAuthorization');
const logger = require('../config/logger');
const _ = require('lodash');
const express =  require('express');
const router = express.Router();

router.get('/', userAuthorization,async(req,res)=>{
    res.send(await Movie.find().sort({name:1}).select({name:1,genre:1,rentalValue:1,sellValue:1,numberInStock:1}));
});

router.post('/',[userAuthorization,roleAuthorization(['Employee','Admin'])],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.message);    
    
    genresArray = [];
    await Promise.all((req.body.genreId).map(async element =>{
        let genre = await Genre.findById(element);
        if(!genre) logger.info('Genre not found.');
        else genresArray.push(genre.name);        
    }));

    let movie = new Movie(_.pick(req.body,['name','rentalValue','sellValue','numberInStock']));
    movie.genre = genresArray;

    movie = await movie.save();
    res.send(movie);
});

router.put('/:id',[userAuthorization,roleAuthorization(['Employee','Admin'])], async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.message);

    genresArray = [];
    await Promise.all((req.body.genreId).map(async element =>{
        let genre = await Genre.findById(element);
        if(!genre) logger.info('Genre not found.');
        else genresArray.push(genre.name);        
    }));    

    let movie = await Movie.findByIdAndUpdate(req.params.id,{$set:
        {name: req.body.name,
        genre: genresArray,
        rentalValue: req.body.rentalValue,
        sellValue: req.body.sellValue,
        numberInStock: req.body.numberInStock}});

    if(!movie) return res.status(404).send('Movie not found.');

    res.send(movie);
});

router.delete('/:id',[userAuthorization,roleAuthorization(['Admin'])],async(req,res)=>{
    const movie = Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send('Genre not found.');
    res.send(movie);
})

module.exports = router;