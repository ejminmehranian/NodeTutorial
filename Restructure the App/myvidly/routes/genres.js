const Joi = require('joi');
const express = require('express');
const router = express.Router();

const geners = [
    {id : 1, name: "Action"},
    {id : 2, name: "Horor"},
    {id : 3, name: "Tanzi"},
]

router.get('/api/genres',(req,res)=>{
    res.send(geners);
})

router.post('/api/genres',(req,res)=>{
    const {error } = validateGenre(req.body);
    if (error) return res.status(400).send("Failed 400");

    const genre = {
        id : genres.length+1,
        name : req.body.name
    }

    geners.push(genre);
    res.send(genre);
})

router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name; 
    res.send(genre);
  });
  
  router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
  
    res.send(genre);
  });
  
  router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  });
  
  function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }
  
  module.exports = router;