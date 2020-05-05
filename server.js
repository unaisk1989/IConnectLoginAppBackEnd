const express = require('express') //Express library
const bodyParser = require('body-parser') //For reading form data
const mongoose = require('mongoose') //Mongoose middleware for mongodb connection and queries
const cors = require('cors') //For handling/allowing cross origin requests
const dbConfig = require('./config/mongodb') //Get DB URL from configuration file

const userRoutes = require('./routes/user.routes') //"User" routes


//Instantiate the express app
const app = express()
//Use cors to allow cross origin request from our angular client app
app.use(cors())
//Use body parser to process forms (request.body) parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Add the "user" routes as middleware
app.use('/api', userRoutes) 

mongoose.Promise= global.Promise;

//Connect to mongodb and notify connection status
mongoose.connect(dbConfig.db_url, {
    useNewUrlParser: true
}).then(()=>{
    console.log('Database connected successfully.')
},
error => {
    console.log('Failed to connect to the database')
})



const port = 3000;

//App starts listening to request on port 3000
const server = app.listen(port, () => {
    console.log('Listening on port' + port)
})


//Centralised error handling middleware to catch any unhandled exceptions
app.use((err, req, res, next) => {
    console.error(err.stack) //Log error message encountered during any request
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})