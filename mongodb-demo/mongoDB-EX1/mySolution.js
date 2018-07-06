const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=>console.log('conected to mongodb'))
    .catch(err=>console.log(err.message))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String, 
    tags: [ String ],
    date: Date, 
    isPublished: Boolean,
    price: Number
    });

const Course = mongoose.model('Course',courseSchema);

async function publishAuthors(){
    const allPublishAuthors = await Course.find({ isPublished: true, tags: 'backend' }).sort({name:1}).select({name:1,author:1});
    return allPublishAuthors; 
}

async function secondPublishedAuthors(){
    return await Course.find({isPublished:true}).or([{tags:'frontend'},{tags:'backend'}]).sort('-price').select('name author');
}
async function run(){
    const getPublishedAut = await publishAuthors();
    console.log('This is first exercise ' ,getPublishedAut);
    const second = await secondPublishedAuthors();
    console.log('This is second exercise ' ,second);
}
run()