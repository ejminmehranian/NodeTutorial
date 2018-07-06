/**
 * CALLBAKS: is a function which is used to be passed to other functions 
 * as a reference. Since we are using asynchronus in node, then sometimes 
 * we must wait for an operation to end before we do anything, this is why
 * we pass callback functions as a reference and when the operation is done
 * callback function is used to do the operation needed.
 */
// console.log('before')
// getUser(1,displayUser);

// function displayUser(user){
//     console.log('user',user);
//     getRepos(user.githubName,displayRepos);
// }

// function displayRepos(commits){
//     console.log(commits);
// }
// console.log('after')
// /**
//  * 
//  * @param {*} id 
//  * @param {*} callBack function is a function to call when the result of the 
//  *                      assyncronus object is ready
//  */
// function getUser(id,callBack){
//     setTimeout(()=>{
//         console.log('reading a user from db')
//         callBack({ id: 1, githubName : 'Ej'})
        
//     },2000)
// }

// function getRepos(username,callBack){
//     setTimeout(()=>{
//         console.log('getting repos');
//         callBack(['repo1','rep2']);
//     },2000)
// }

/**
 * promises
 */

  //using promises
// console.log('before')
// getUser(1,displayUser);

// function displayUser(user){
//     console.log('user',user);
//     getRepos(user.githubName,displayRepos);
// }

// function displayRepos(commits){
//     console.log(commits);
// }
// console.log('after')
/**
 * 
 * @param {*} id 
 * @param {*} callBack function is a function to call when the result of the 
 *                      assyncronus object is ready
 */
function getUser(id){
    return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log('reading a user from db');
                resolve({ 
                    id: 1, 
                    name: 'Mosh Hamedani', 
                    isGold: true, 
                    email: 'email' 
                  });
            },2000)
    })
    
}

function getRepos(username,callBack){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('getting repos');
            resolve([1,2,3])
        }, 2000);
    })
}

//promise based approach
// p.then(user=>getRepos(user.githubName))
//  .then(repos=>console.log(console.log(repos)))
//  .catch(err=>console.log('error is ',err.message));

 //async and await-- same as above but looks like synchronized
 async function displayReps(){
    try {
        const user = await getUser(1);
        const repo = await getRepos(user.githubName);
        console.log(repo);
    }catch(err){
        console.log(err);
    }
 }

 displayReps();