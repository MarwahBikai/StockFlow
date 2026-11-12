// Backend-Session-5

const mongoose= require('mongoose')

const Schema= mongoose.Schema

const companySchema= new Schema ({

     name:{
        type:String,
        required:[true,'Name is required'],
        trim:true,
        minLength:3,
        maxLength:50
    },
    officialWebsite:{
        type:String,
        default:""
    },
     email:{
        type:String,
        required:[true,'Email is required'],
        trim:true,
        unique:true,
        maxLength:150,
        lowercase:true
    },
    phoneNumber:{
       type:String,
        required:[true,'Phone number is required'],
        trim:true,
        unique:true,
        maxLength:20,
    
    },
     location:{
        country:{
            type:String,
           required:[true,'Country is required']
        },
        city:{
            type:String,
           required:[true,'City is required']
        },
        address:{
            type:String,
           required:[true,'Address is required']
        }

    },
    type:{
        type:String,
        enum:['warehouse','userClient'],
        required:[true,"Company's type is required"]
    },

  
        userClientCompanyType:{
            type:String,
            enum:['retailers','pharma-distributors','electronics-importer']
        },
        contactPerson:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        contractStartDate:{
            type:Date,
            default:Date.now
        
    }
    ,  isActive:{
        type:Boolean,
        default:true
     }
    
    
},{timestamps:true})

module.exports= mongoose.model("Company",companySchema)

//User=> collection of documents of users
// User=> users