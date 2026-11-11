// Backend-Session-5

const mongoose= require('mongoose')

const Schema= mongoose.Schema

const userSchema= new Schema ({
    firstName:{
        type:String,
        required:[true,'First Name is required'],
        trim:true,
        minLength:3,
        maxLength:50
    },
     lastName:{
        type:String,
        required:[true,'Last Name is required'],
        trim:true,
        minLength:3,
        maxLength:50
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
    password:{
        type:String,
        required:[true,'Password is required'],

    },
    passwordConfirm:{
         type:String,
         required:[true,'Password confirm is required'],
    },
    role:{
        type:String,
        enum: ['admin', 'userClient' , 'inventoryController','dispatcher', 'warehouseManager','warehouseOperator','driver'],
        required:[true,'Rolee is required']

    },
    userClient:{
        company:{
            type: Schema.Types.ObjectId,
            ref:"Company"
        }
    },
    warehouseManager:{
        company:{
            type: Schema.Types.ObjectId,
            ref:"Company"
        }
    },
    warehouseOperator:{
        company:{
            type: Schema.Types.ObjectId,
            ref:"Company"
        }
    }
    
    
},{timestamps:true})

module.exports= mongoose.model("User",userSchema)

//User=> collection of documents of users
// User=> users