//PROMISE-promises an accept state or reject state
const p = new Promise((resolve,reject)=>{
    //start an async work
    setTimeout(()=>{
        resolve(1);
        // reject(new Error('it was an error'));
    },2000);
    
    
});

//consumer of the promise
p.
    then(result=>console.log('result',result))
    .catch(err=>console.log('error',err.messsage));