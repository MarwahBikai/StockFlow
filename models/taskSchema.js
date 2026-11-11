// Backend-Session-5

const mongoose= require('mongoose')

const Schema= mongoose.Schema

const taskSchema= new Schema ({

     title:{
        type:String,
        required:[true,'title is required'],
        trim:true,
        minLength:15,
        maxLength:30
    },
       desc:{
        type:String,
        minlength:200,
        maxlength:500,
        required:[true,'Description is required'],

    },
    warehouse:{
        type:Schema.Types.ObjectId,
        ref:'Company'
    },
    urgencyLevel:{
        type:String,
        enum:['low','medium','high']

    },
     submittedBy:{
            type: Schema.Types.ObjectId,
            ref:'user',
            required:[true,'User submitting the task is required']
          },
    assignedTo:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    
    deadline:{
        type:Date,
        required:[true,'Deadline is required'],

    }
    
},{timestamps:true})

module.exports= mongoose.model("Task",taskSchema)

//User=> collection of documents of users
// User=> users