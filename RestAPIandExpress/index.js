//set the debugger by assigning export DEBUG=app:startup
const startupDebugger = require('debug')('app:startup');
const dbDebugger= require('debug')('app:db');
const config = require('config');
/**
 * to be able to do encoding and populating req.body
 *and to do the CRUD
 */
const express = require('express');
const logger = require('./middleware/logger')
//joi is used for function request validation
const Joi = require('joi');
//securing http requests
const helmet = require('helmet')
//for logging http requests
const morgan = require('morgan')
const app = express();

//router to refer to
const courses = require('./routes/courses');
const home = require('./routes/home');

/**
 * envoirment node enviorment
 *we can put the stage to testing, production and etc..
 *process.env.NODE_ENV: to change the NODE_ENV in terminal export it
 *export NODE_ENV=productionx
 */
console.log(`current env is ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

/**
 * parses the body of the request and if there is json the populates
 * req.body with json
 */
app.use(express.json());

/**
 * key=value&key=value
 * parses this urlencoded, and sets up the req.body with json
 * extended true is saying we can pass arrays and objects
 */
app.use(express.urlencoded({extended:true}));

//gets files from public folder
app.use(express.static('public'));
/**
 * app.use(function(req,res,next){
    console.log("logging...");
    next();
    })
 */

app.use(logger);
//secures http requests
app.use(helmet());
/**telling expresses any route that starts with courses use  
 * courses router
 */
app.use("/api/courses",courses);
app.use('/',home);
//logs http reqests
if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    startupDebugger('morgan enabled...');
}

dbDebugger("Connect to db")

//configuration
console.log('Application Name: ' + config.get('name'))
//getting it from the NODE_ENV set prior.. export NODE_ENV=development/production
console.log('Mail Server: ' + config.get('mail.host'))
//reads the password from enviornmet variable. by doing export appName_pass=1234
console.log('Mail Password: ' + config.get('mail.password'))

app.use(function(req,res,next){
    console.log("Authentication...");
    next();
})

//use global port else use 3000
const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening to port ${port}...`))
