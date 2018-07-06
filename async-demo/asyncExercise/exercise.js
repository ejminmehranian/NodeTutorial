
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function sendTopMovie(id){
  try{
    const customer = await getCustomer(id);

    if(customer.isGold){
      
      const topMovies = await getTopMovies();
      const send = await sendEmail(customer.email,topMovies)
      console.log(send);
    }else{
      console.log(123);
    }
  }catch(err){
    console.log('error occured:',err);
  }
}
function getCustomer(id, callback) {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('getting customer info')
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      })
    }, 4000);  
  })
  
}
function getTopMovies() {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log('queying top movies')
      resolve(['movie1', 'movie2']);
    }, 4000);
  })
  
}

function sendEmail(email, movies, callback) {
  return new Promise((resolve,reject)=>{
    
    setTimeout(() => {
      console.log(`${email} and movie is ${movies}`)
      resolve('done');
    }, 4000);
  })
  
}

sendTopMovie();