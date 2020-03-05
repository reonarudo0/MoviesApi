const {Genre,validate} = require('../models/genre');
const userAuthorization = require('../middleware/userAuthorization');
const roleAuthorization = require('../middleware/roleAuthorization');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/',[userAuthorization,roleAuthorization(['Employee','Admin'])],async (req,res)=>{
    res.send(await Genre.find().sort({name:1}));
});

router.get('/:id',[userAuthorization,roleAuthorization(['Employee','Admin'])],async (req,res)=>{
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('Genre not found.');
    res.send(genre);
});

router.post('/',[userAuthorization,roleAuthorization(['Admin'])],async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send('Genre not valid.');

    let genre = new Genre(_.pick(req.body,['name']));
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id',[userAuthorization,roleAuthorization(['Employee','Admin'])],async(req,res)=>{
    let genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('Genre not found.');

    const {error} = validate(req.body);
    if(error) return res.status(400).send('Genre not valid.');

    genre.name = req.body.name;
    genre = await genre.save();
    res.send(genre);
});

router.delete('/:id',[userAuthorization,roleAuthorization(['Admin'])],async(req,res)=>{
    let genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre)  return res.status(404).send('Genre not found.');
    res.send(genre);
});

module.exports = router;