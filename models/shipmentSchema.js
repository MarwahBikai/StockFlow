// Backend-Session-5

const mongoose= require('mongoose')

const Schema= mongoose.Schema

const shipmentSchema= new Schema ({

    order:{
        type:Schema.Types.ObjectId,
        ref:"Order"
    },
    TransportationInformation:{
        VIN:{
            type:String,
           required:[true,'VIN is required'],

        },
        driver:{
              type:Schema.Types.ObjectId,
             ref:"User"
        }
    },
    leftSourceAt:{
        type:Date,
        required:[true,'Date leaving source is required'],

    },
    estimatedBusinessDays:{
        type:number,
        required:[true,'Estimated business days is required'],

    },
    Arrived:{
        type:boolean,
        default:false
    },
    contactInformation:{
        ReceivingName:{
            type:String,
            minLength:3,
            maxLength:10
        },
          phoneNumber:{
       type:String,
        required:[true,'Phone number is required'],
        trim:true,
        unique:true,
        maxLength:20,
    
    },     location:{
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

    },receipts:[{
      receipt:{
        type:String,
      },
      generatedAt:{
        type:Date,
        default:Date.now
      }
    }]
    }

    
},{timestamps:true})

module.exports= mongoose.model("Shipment",shipmentSchema)

//User=> collection of documents of users
// User=> users