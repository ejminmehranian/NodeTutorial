const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author: {type:authorSchema,required:true}
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}


async function updateAuthor(courseId){
  //Aproach1 TO SAVE
  // const course = await Course.findById(courseId);
  // course.author.name = 'lolik',
  // course.save()
  //Approach2 TO SAVE
  const course = await Course.update({_id:courseId},{
    $set:{
      'author.name':'EJMIN'
    }
  })
  //Approach3 to remove the object from the property
  // const course = await Course.update({_id:courseId},{
  //   $unset:{
  //     'author':''
  //   }
  // })
}

//add another author to the list of authors
async function addAuthor(courseId,author){
  const course = await Course.findById(courseId);
  course.authors.push(author)
  course.save()
}

//remove an author
async function removeAuthor(courseId,authorId){
  const course = await Course.findById(authorId);
  const author = course.authors.id(authorId);
  author.remove()
  course.save()
}
//author will be under a course object it is not stand alone author in this case
//createCourse('Node Course', [new Author({name:'eJMIN'}),new Author({name:'JMIN'})]);

//add author to a list of authors inside an object
// addAuthor('5b3d0e615e83fa8d0f86bedf',new Author({name:'ZORIK'}))