/**
 * Backend-Session-4
 * Use mongoose as ODM (object data modeling) with Node.js,links object-oriented code into document-based db (MongoDB) 
 */
const mongoose=require('mongoose')
/** Backend-Session-4
 * .env is not shared with github/cloud provider, it has secrets and credentials, should be hidden so attackers don't get them through reverse engineering
 * to load the content (variables) of .env file we use .config()
 *  so that nodejs can access them**/
require('dotenv').config()
//nodejs created process.env object having environment variables

/**set up the db 
 * Backend-Session-4
 * exports , for exporting function being a global function, can be access in th index.js
  async because it returns a promise and we don't want to block loop,or other code execution
*/
exports.connectDB= async()=>{
   //Backend-Session-4
   //try to connect , else catch error and log it
    try{
        //Backend-Session-4
        //using async function, returning a promise, and returning a promise needs an "await"
        // . connect () is built in mongoose function to connect to mongodb,accessing mongoDB_URL through process.env.mongoDB_URL
        await mongoose.connect(process.env.mongoDB_URL)
 //Backend-Session-4
        //if db connected ,log "db connected"
        console.log("db is connected")
}catch(err){
     //Backend-Session-4
    //log the error to console
    console.log(err)
     //Backend-Session-4
    // if db didn't connect , stop server/exit process
    process.exit(1)
}
}



