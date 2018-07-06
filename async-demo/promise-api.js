// Promise.resolve({id:1})
// p.then(result=>console.log(result))

// //OR

// Promise.reject(new Error('reason for rejection..'));
// p.catch(err=>console.log(err))

const p1 = new Promise((resolve)=>{
    setTimeout(() => {
       console.log('async operation 1..');
       resolve(1);
    }, 2000);
})

const p2 = new Promise((resolve,reject)=>{
    setTimeout(() => {
       console.log('async operation 2..');
       resolve(2);
    }, 2000);
})

/**
 * this promise waits for p1 and p2 to end before calling the promise
 */
// Promise.all([p1,p2])
//     .then(result=>console.log(result))
//     .catch(err=>console.log(err.message))

/**
 * returns the value of the first completed promise
 */
Promise.race([p1,p2])
    .then(result=>console.log(result))
    .catch(err=>console.log(err.message))