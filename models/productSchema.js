// Backend-Session-5

const mongoose= require('mongoose')

const Schema= mongoose.Schema

const productSchema= new Schema ({
   
    name:{
        type:String,
         required:[true,'Name is required'],
        trim:true,
        minLength:3,
        maxLength:50 
    },
    img:{
        type:String,
        default:""
    },
    company:{
        type:Schema.Types.ObjectId,
        ref:"company"
    },
    currentWarehouse:{
        type:Schema.Types.ObjectId,
        ref:"company"
    },
    stock:{
        type:number,
        min:1,
      required:[true,'stock is required'],

    },
    SKU:{
        type:String,
        required:[true,'SKU is required'],
        trim:true
    },
    desc:{
        type:String,
        minlength:200,
        maxlength:500
    },
    category:{
        type:String,
        enum:['food','pharma','electronics'],
        required:[true,'category is required'],
    },
    expiryDate:{
        type:Date,
    },
    unit:{
        type:String,
        enum:['pcs','kg','L','packets'],
    }
    ,weight:{
        type:number,
       
    },
    dimensions:{
        type:String,
        dimension:{
            length:{
                type:number,
            },
            width:{
                type:number
            },
            height:{
                type:number
            },
            dimensionUnit:{
                type:String,
                enum:['cm','inch']
            }
        }
    },
    barCode:{
        type:String,
        default:""
    },
    receipts:[{
      receipt:{
        type:String,
      },
      generatedAt:{
        type:Date,
        default:Date.now
      }
    }],
    events:[
        {
          eventType:{
            type:String,
            enum:['receive','move', 'reserve', 'pick', 'dispatch', 'adjust']
          },
          quantity:{
            type:number,
            required:[true,'quantity is required']
          },
          generatedAt:{
           type:Date,
           default:Date.now
          },
          submittedBy:{
            type: Schema.Types.ObjectId,
            ref:'user',
            required:[true,'User submitting the event is required']
          },
            approvedBy:{
            type: Schema.Types.ObjectId,
            ref:'user',
          },
          warehouseOperators:[
            {
                type: Schema.Types.ObjectId,
                ref:'user',
            }
          ],
        warehouse:{
        type:Schema.Types.ObjectId,
        ref:"company"
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

    }

        }
    ]
    
},{timestamps:true})

module.exports= mongoose.model("Product",productSchema)

