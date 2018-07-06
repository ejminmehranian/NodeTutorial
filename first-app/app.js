// function sayHello(name){
//     console.log('hello'+name);
// }

// sayHello('lol');

//will cause error becuase we dont have doc object
// console.log(window);

// 1.global=window in node
// 2.variables are not in global so we can not
//     access variables through global

//every file in node is a module and variables
//and functions are scoped in that module

//useful modules: os, path, process, query strings, stream,
//http, file system

//load a module

//---------------------------------------section1 of logger.js
// console.log(1)
// const log = require('./logger');

// log('message');
//----------------PATH-----------------------
console.log(2)

   //every node module is sarrounded by a function wrapper called (function(exports,required,__filename,__dirname)){})(module.....)
const path = require('path');

var pathObject = path.parse(__filename);

console.log(pathObject)
//-----------------OS----------------------
console.log(3)

const os = require('os')
var totalMem = os.totalmem();
var freeMem = os.freemem();
console.log(`total mem : ${totalMem} in bits`)
console.log(`free mem : ${freeMem} in bits`)
//------------------FS---------------------
console.log(4)

const fs = require('fs')

//no multithread
fs.readdirSync('./');
fs.readdir('./',function(err,files){
    if(err) console.log("error")
    else console.log(files)
})
//------------------EVENTS---------------------
console.log(5)

//EventEmitter is a class
const EventEmitter = require('events')
const Logger = require('./logger')
const logger = new Logger();

//Register a listener, on is pretty much listen
//order matters listeners come before callers because 
//they get registered and when we emit then it goes over all listeners then picks
logger.on('mesageLogged', (arg) => { //=> is pretty much replacing function
    console.log("listener called",arg)

})
//------------------HTTP---------------------
console.log(6)
//HTTP is an event emitter

const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.write("hello");
        res.end();
    }

    if(req.url ==="/ejmin"){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

server.listen(3000);
console.log("listening to fking 3000")
//-------------NPM---------------------