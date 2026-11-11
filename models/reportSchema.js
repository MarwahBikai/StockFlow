// Backend-Session-5

const mongoose= require('mongoose')

const Schema= mongoose.Schema

const reportSchema= new Schema ({
 title:{
        type:String,
        required:[true,'title is required'],
        trim:true,
        minLength:15,
        maxLength:30
    },
     
    warehouse:{
        type:Schema.Types.ObjectId,
        ref:'Company'
    },
     submittedBy:{
            type: Schema.Types.ObjectId,
            ref:'user',
            required:[true,'User submitting the report is required']
          },
    
    document:{
        type:Sting,
         required:[true,'Report document is required']

    }
    
},{timestamps:true})

module.exports= mongoose.model("Report",reportSchema)

//User=> collection of documents of users
// User=> users