require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path')
let uri = process.env.MONGO_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true})
.then(()=>{
    console.log('connected to database ..')
})
.catch((err)=>{
    console.log('failed to connect database...')
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

const usersRouter = require('./routes/users');
const execriseRouter = require('./routes/exercise');

app.use('/users',usersRouter);
app.use('/exercise',execriseRouter);

    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server runing on port ${port}...`)
})