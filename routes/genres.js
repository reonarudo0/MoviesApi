const {Genre,validate} = require('../models/genre');
const express = resquire('express');
const _ = require('lodash');
const router = express.Router();

router.get('/',async (req,res)=>{
    res.send(await Genre.find().sort({name:1}));
});

router.get('/:id',async (req,res)=>{
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('Genre not found.');
    res.send(genre);
});

router.post('/',async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send('Genre not valid.');

    let genre = new Genre(_.pick(req.body,['name']));
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id',async(req,res)=>{
    let genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('Genre not found.');

    const {error} = validate(req.body);
    if(error) return res.status(400).send('Genre not valid.');

    genre.name = req.body.name;
    genre = await genre.save();
    res.send(genre);
})

router.delete('/:id',async(req,res)=>{
    let genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre)  return res.status(404).send('Genre not found.');
    res.send(genre);
})

module.exports = router;