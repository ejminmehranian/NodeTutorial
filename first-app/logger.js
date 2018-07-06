var url = 'http://mylogger.io/log'
//----------------------------------------section1
//EventEmitter is a class
const EventEmitter = require('events')

class Logger extends EventEmitter{
    log(message){
        //send an http request
        console.log(message);
        //raise an event, signal is happening
        this.emit('messageLogged',{id:1,url:'http://'});
    }

}

// //exports the whole object
// module.exports.log = log;

//exports just the function
// module.exports = log;

module.exports = Logger;
//----------------------------------------