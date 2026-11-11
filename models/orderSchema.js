// Backend-Session-5

const mongoose= require('mongoose')

const Schema= mongoose.Schema

const orderSchema= new Schema ({

    client:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },

    products:[
        {
            product:{
            type:Schema.Types.ObjectId,
            ref:'Product'
        },
        quantity:{
            type:number,
            required:[true,'quantity is required'],

        }
    }

    ],
    status:{
        type:String,
        enum:['pending','dispatched','delivered']
    },
     receipts:[{
      receipt:{
        type:String,
      },
      generatedAt:{
        type:Date,
        default:Date.now
      }
    }]
    
},{timestamps:true})

module.exports= mongoose.model("Order",orderSchema)

//User=> collection of documents of users
// User=> users