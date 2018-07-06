//must first install mongoose
//then must do mongod to start server
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log('conected to mongodb'))
    .catch(err=>console.log(err.message))

    //validation could be both joi and this way. join checks user input
    //required makes sure we save to db
    const courseSchema = new mongoose.Schema({
        //this field must in the constructor input
        name: {type:String,required:true,minlength:5,maxlength:10},
        author: String,
        //tags:[String],
        tags: {
            type:Array,
            validate:{
                isAsync: true,
                //async validations
                validator: function (v,callback){
                    setTimeout(() => {
                        const r= v && v.length > 0
                        callback(r)
                        
                    }, 2000)
                },
                // validator: function (v){
                //     //if v is valid and length is more than 0
                //     return v && v.length > 0;
                // },
                message: 'A course should have more than 0'
            }

        },
        date: {type: Date, default:Date.now},
        isPublished:Boolean,

        //1.) we can not use => because mongoose has a validation method
        //when using required which uses this(which will refer to the arrow),
        //therefore we must use function ()
        price: {
            type: Number,
            required: function (){return this.isPublished},
            min:10,
            max:20,
            getter: v=> Math.round(v),
            set: v => Math.round(v),
        },

        category:{
            type:String, 
            required: true,
            enum:['web','mobile','network'],
            lowercase:true
            //removes padding around the string " Ejmin"=>"Ejmin"
            //trim:true 
        }
    })

    const Course = mongoose.model('Course',courseSchema);
 async function createCourse(){

    const course = new Course({
        name: 'Angular',
        author:'ejmin2',
        tags: ['lol','pos'],
        isPublished: false
    })

    
    try{
        //if fails goes to catch
        await course.validate();
        //or
        //const result = await course.save();
        //console.log(result);
    }catch(ex){
        // console.log(ex.message);
        //validation error
        for(field in ex.errors){
            console.log(ex.errors[field].message)
        }
        
    }
}

async function getCourses(){
    /**
     * since mongoose is build on top of mongo then these operators are in both
     * eq,ne,gt,gte,lt,lte,in,nin
     * */
    
     //basic querry
    // const courses = await Course.find({author: "Ejmin",isPublished:true})
    //                        .limit(10).sort({name:1}).select({name:1,tags:1});
    
    //comparison querying 
    //const courses = await Course.find({price:{$gte:10,$lte:20}}).find({price:{$in:[1,2,3]}})

    //logical querying
    //const courses = await Course.find().or([{name:"Ejmin"},{isPublished:true}]);

    //regular expressions
    //starts with ejmin-ends with 2 and is case sensitive-contains ejmin anywhere-then count how any
    const courses = await Course.find({author:/^Ejmin/}).find({author:/2$/}).find({author:/.*Ejmin*./i}).count();

    console.log(courses);
    
}

//queryFirst
// async function updateCourse(id){
//     const course = await Course.findById(id);
//     if(!course) return;
//     course.isPublished = true;
//     const result = await course.save();
// }


//update without querying
async function updateCourse2(id){
    //googlef or mongodb update operators
    //if you want the object to be returned use findByIdAndUpdate instead of update
    const result = await Course.update({_id:id},{
        $set :{
            isPublished:false
        }
        //new true will update and create a new one
    },{new:true})
}

async function removeDocument(id){
    //you can use deleteMany,findByIdAndRemove
    const result = await Course.deleteOne({_id:id});
    console.log(result);
}
//getCourses();