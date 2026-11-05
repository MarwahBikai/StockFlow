// Backend-Session-4
// decalre express dependency, create an instance of express framework
const express=require('express')
 //Backend-Session-4
 // //create a new app instance => create server/ accept a new connection
const app=express()
 //Backend-Session-4
// get db connection function from database.js, without () , so it doesn't auto execute/ just a pointer so we can call it later, it being ready
//make sure database is ready before the app begins handling incoming requests
const db= require("./database").connectDB;
db();
 //Backend-Session-4
//create middleware, special type of function which executes automatically without calling it when every request is created 
//work/parse with json, independent of frontend react/flutter frontend...
app.use(express.json())
 //Backend-Session-4
//built-in, open http port
//every request/response are sent to/from this port, must be valid/not taken, 0-1023 are reserved for known services in the os, servers on same port will fail with EADDINUS error
app.listen(3000,
     //Backend-Session-4
    //execute once successfull port server running
    ()=>{
      console.log("server is running on port 3000")
    }
)

