const { json } = require('express');
const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');

router.get('/',(req,res)=>{
    Exercise.find()
        .then((exercises) =>{
            res.status(200).json(exercises)
        })
        .catch(err =>{
            res.status(404).json('error')
        })
})

router.post('/add',(req,res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    newExercise.save()
    .then(()=>{
        res.status(201).json('exercises added')
    })
    .catch(err =>{
        res.status(500).json('error')
    })
})

router.get('/:id',(req,res)=>{
    Exercise.findById(req.params.id)
        .then(exercises =>{
            res.status(200).json(exercises)
        })
        .catch(err =>{
            res.status(404).json('error')
        })
})

router.delete('/:id',(req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercises =>{
            res.status(200).json('successfully deleted.')
        })
        .catch(err =>{
            res.status(404),json('error')
        })
})

router.post('/update/:id',(req,res)=>{
    Exercise.findById(req.params.id)
        .then(exercises =>{
            exercises.username = req.body.username;
            exercises.description = req.body.description;
            exercises.duration = Number(req.body.duration);
            exercises.date = Date.parse(req.body.date);

            exercises.save()
                .then(()=>{
                    res.status(201).json('Exercise added')
                })
                .catch(err =>{
                    res.status(500).json('error')
                })
        })
})

module.exports = router;