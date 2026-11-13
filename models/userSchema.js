// Backend-Session-5

const mongoose= require('mongoose')

const Schema= mongoose.Schema

// Backend-Session-8
const bcrypt= require('bcrypt')

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
        trim:true,
        minLength:8

    },
    passwordConfirm:{
         type:String,
         trim:true,
         minLength:8
    },
    passwordChangedAt: Date,
    role:{
        type:String,
        enum: ['admin', 'userClient' , 'inventoryController','dispatcher', 'warehouseManager','warehouseOperator','driver'],
        required:[true,'Role is required']

    },

    company:{
            type: Schema.Types.ObjectId,
            ref:"Company"
        },
     isActive:{
        type:Boolean,
        default:true
     }
     
    
    
},{timestamps:true})

//Backend-Session-8
//automatic, pre-save middleware, runs whn saving to db , create() or save(),not update functions, before document is saved to db
userSchema.pre('save', async function(next){
    try{
        if(!this.isModified("password")){
            //ismodified() return true if field is modified
            return next() }
            //continue to next task
            //saving without password change

            //multiple rounds of hashing , saves hashing discovreing in reverse engineering
            //bcrypt is async, so we use await
            this.password= await bcrypt.hash(this.password,12)
            //don't save passwordconfirm , just for frontend
            this.passwordConfirm=undefined

      
    
 } catch(err){console.log(err)}

}
)

//mathods: static function to call 
userSchema.methods.checkPassword= async function(candidatePassword
    //coming from frontend
    ,userPassword //hashed saved password in db
)
{
    //string plain password , encrypted password, order in compare()
    return await bcrypt.compare(candidatePassword,userPassword)
}

module.exports= mongoose.model("User",userSchema)

//User=> collection of documents of users
// User=> users