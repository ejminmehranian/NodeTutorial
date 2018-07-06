const express = require('express');
const router = express.Router();

const courses = [
    {id:1, name: "course1,"},
    {id:2, name: "course2,"},
    {id:3, name: "course3,"},
];

//c id the lement in the course array such that id == params.id
router.get('/:id',(req,res)=>{
   let course =  courses.find(c=>c.id === parseInt(req.params.id));
   if(!course){
       res.status(404).send('Given Id was not found');
       return;
   }else{
       res.send(course)
   }
})

router.post('/',(req,res)=>{
    // if(!req.body.name || req.body.name.length < 3){
    //     res.status(400).send("bad input");
    //     return;
    // }

    //for validation we use the package joi
    const schema = {
        name : Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body,schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name : req.body.name
    };
    courses.push(course);
    res.send(course);
})

router.put('/:id',(req,res)=>{
    let course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('Given Id was not found');
        return;
    }else{
        res.send(course)
    } 

    const schema = {
        name : Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body,schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = name;
    res.send(course);
})

router.delete('/:id',(req,res)=>{
    let course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('Given Id was not found');
        return;
    }else{
        res.send(course)
    }  

    const index = courses.indexOf(course);

    courses.splice(index,1);

    res.send(courses);
})

module.exports = router