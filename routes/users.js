const express = require('express');
const router = express.Router();
const Users = require('../models/user.model');

router.get('/',(req,res)=>{
    Users.find()
        .then((user)=>{
            res.status(200).json(user)
        })
        .catch(err =>{
            res.status(400).json('error')
        })
})

router.post('/add',(req,res)=>{
    const username = req.body.username;

    const newUser = new Users({
        username
    })

    newUser.save()
        .then(()=>{
            res.status(201).json('user added')
        })
        .catch(err =>{
            res.status(500).json('error')
        })
})

module.exports = router;