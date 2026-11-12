// Backend-Session-7
const Company= require('../models/companySchema')
const User =require('../models/userSchema')
const mongoose=require('mongoose')
const jwt =require('jsonwebtoken')
//Backend-Session-10 
const allowedRoles= ['admin', 'userClient' , 'inventoryController','dispatcher', 'warehouseManager','warehouseOperator','driver']


// Backend-Session-8
//declare validator instance from the validator npm
const validator= require('validator')
 exports.signup=async(req,res)=>{
    try{
        //get email from request body
        const email= req.body.email;

        //validator.isEmail takes email and checks if email is valid ,format etc..
        if(!validator.isEmail(email))

            //400 for bad request status, success being false, message describes the error that happened
            return res.status(400).json({
                success:false,
                message:"Invalid email address"
        })

        //check if user exists in db, (email being unique in schema). findOne() usage
        const emailExistence= await User.findOne({
            email:email
        })

        if (emailExistence){
            //conflict 409 status,same email issue
                return res.status(409).json({
                success:false,
                message:"User already exists"
        })
        }
        //make sure password and confirm match
        if (req.body.password !== req.body.passwordConfirm)
            //bad request , bad input, 400 as status code
                return res.status(400).json({
                success:false,
                message:"password and password confirm must match"
                })

                //Backend-Session-10 
                //check allowed roles as in enum in schema
                const ValidRole= allowedRoles.includes(req.body.role)

                if(!ValidRole)
                       return res.status(400).json({
                success:false,
                message:"Invalid role"
                })

                if(req.body.role && (req.body.role=='inventory-controller' || req.body.role=='dispatcher') && req.body.company)
                      return res.status(400).json({
                success:false,
                message:"Inventory controller and dispatcher are responsible of all warehouses"
                })
               
                    //create new user in User collection using create()
                const newUser= await User.create({
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    password:req.body.password,
                    passwordConfirm:req.body.passwordConfirm,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    role:req.body.role,
                    //user client has a company, warehouse manager belongs to one warehouse , each warehouse operator is responsible of one warehouse

                    company:req.body.company || null,
                    passwordChangedAt: Date.now()

                })

                //successfull creation
               createAndSendToken(newUser,201,"Signed up successfully",res)


    }catch(err){

        return res.status(500).json({
            success:false,
            message:err.message
        })
    }

}
//Backend-Session-8
 exports.login=async(req,res)=>{
try{
  //get email and password from request body

    const {email,password} = req.body

    //frontend and schema attribute same, write email === email: email
    const user= await User.findOne({
        email
    })

    if(!user || !(await user.checkPassword(password,user.password)))
         return res.status(401).json({
            success:false,
            message:"Invalid credentials" //don't specify which credential is wrong, for attackers attempts to figure out the users' credentials
        })

        //Backend-Session-9


        createAndSendToken(user,200,"Logged in successfully",res)
    //  return res.status(200).json({
    //         success:false,
    //         message:"Logged in successfully"
    //     })

}catch(err){
      return res.status(500).json({
            success:false,
            message:err.message
        })
}
}

//Backend-Session-9
const signToken=(user)=>{
    return jwt.sign({id: user._id,role:user.role}
        //can add more props
          ,process.env.JWT_SECRET,
           { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
        )
}

//create token once login or signup 
//Backend-Session-9
const createAndSendToken=(user,statusCode,message,res)=>{
const token= signToken(user)
//sanitize user
const sanitizedUser=
{
    id:user._id,
    role:user.role
}
    res.status(statusCode).json({
        success:true,
        data: sanitizedUser,
        token,
        message:message
    })
}
 //Backend-Session-9
 exports.protect= async(req,res,next)=>{
    try{

        //extract token
        let token ;
        //get auth header
        const authHeader= req.headers.authorization

        //token is saved in auth header starts with 'Bearer-token...'
        if(authHeader.startsWith('Bearer'))
            //get actual token
            token=authHeader.split(" ")[1]

            //user not logged in
        if(!token){
        return res.status(401).json({
            success:false,
            message:"You are not authenticated"
        })
        }

        //verify token
        //decode token
        const decoded= await jwt.verify(token, process.env.JWT_SECRET)
        //CHECK USER EXISTENCE

        const user = await User.findOne({_id:decoded.id})
        if(!user){
               return res.status(401).json({
            success:false,
            message:"User no longer exists"
        })
        }
        // UNDONE: verify if password is not changes after token

        
        //token is valid
        req.user=user
        next()

    }catch(err){

      
        
          if(err.name='TokenExpiredError'){
              return res.status(401).json({
              success:false,
            message:"Token expired,login again"
        })
        }

    
              return res.status(500).json({
              success:false,
              message:"Something went wrong,try again later"
        })
  
    }
 }
//change password
exports.changePassword=async(req,res)=>{
    try{
        const {oldPassword,newPassword,newPasswordConfirm}= req.body
        const user= await User.findOne({
            _id: req.user._id
        })
         if(!user){
               return res.status(401).json({
            success:false,
            message:"User no longer exists"
        })
        }
        //session 9
        if(await !(user.checkPassword(oldPassword, user.password)))
              return res.status(400).json({
            success:false,
            message:"Old password is not correct"
        })

        if (newPassword!== newPasswordConfirm)
            //bad request , bad input, 400 as status code
                return res.status(400).json({
                success:false,
                message:"password and password confirm must match"
                })
        user.password=newPassword
        user.passwordConfirm=newPasswordConfirm

        await user.save()

         return res.status(200).json({
              success:true,
              message:"password updated successfully"
        })
        

    }catch(err){
        return res.status(500).json({
              success:false,
              message:"Something went wrong,try again later"
        })
  
    }
}
//admin
//get users
exports.getUsers= async(req,res)=>{

    try{
    if(req.user.role !== 'admin')
       return res.status(403).json({message:"You are not authorized to view users"}) 
    
    //find({}) , no filter ,return all users
  
    const users= await User.find({})

    return res.status(200).json({
        success:true,
        data:users
    })}
    catch(err){
          return res.status(500).json({
             success:false,
             message:err.message})
    }
}

//create users Backend-Session-6
exports.createUser= async(req,res)=>{
    try{
       const admin= await User.findOne({
        _id: req.user.id,
        role:'admin'
       })  
       if(!admin)
        // else than admin you do not hav accss to create a user
         return res.status(401).json({
        success:false,
        message:"Admin account is not found"})
         
        if( !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.passwordConfirm || !req.body.role)
            return res.status(400).json({
        success:false,
        message:"Missing required Fields!"})
         
        if(req.body.company){
            const company= await Company.findOne({_id:req.body.company.toString()})
        
            if(!company)
                   return res.status(404).json({
        success:false,
        message:"Cannot find company"})
                   }
         

        const newUser=await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            passwordConfirm : req.body.passwordConfirm,
            role:req.body.role,
            company:req.body.company || null
        })


        return res.status(201).json({
            success:true,
            message:"User created successfully",
            data:
            newUser
        })

    }catch(err){
          return res.status(500).json({
             success:false,
             message:err.message})

    }
}
//edit users
exports.editUser= async(req,res)=>{
    try{
       const admin= await User.findOne({
        _id: req.user.id,
        role:'admin'
       })  
       if(!admin)
        // else than admin you do not hav accss to create a user
         return res.status(401).json({
        success:false,
        message:"Admin account is not found"})

        const user= await User.findOne({
        _id: req.body.id
       })  
       if(!user)
        // else than admin you do not hav accss to create a user
         return res.status(404).json({
        success:false,
        message:"User is not found"})
         

          //Backend-Session-7

          let fieldsToUpdate={}

        if (req.body.firstName)
          fieldsToUpdate.firstName= req.body.firstname
         if (req.body.lastName)
          fieldsToUpdate.lastName= req.body.lastName
         if (req.body.email)
          fieldsToUpdate.email= req.body.email
         if (req.body.password)
          fieldsToUpdate.password= req.body.password
         if (req.body.passwordConfirm)
          fieldsToUpdate.passwordConfirm= req.body.passwordConfirm
         if (req.body.phoneNumber)
          fieldsToUpdate.phoneNumber= req.body.phoneNumber
         if (req.body.role)
          fieldsToUpdate.role= req.body.role
          if (req.body.company)
          fieldsToUpdate.company= req.body.company

          await user.updateOne(fieldsToUpdate)

        return res.status(200).json({
            success:true,
            data:
            user
        })

    }catch(err){
          return res.status(500).json({
             success:false,
             message:err.message})
    }
}
//deactivate users
exports.deactivateUser=async(req,res)=>{
    try{
    const admin= await User.findOne({
        _id: req.user.id,
        role:'admin'
       })  
       if(!admin)
        // else than admin you do not hav accss to create a user
         return res.status(401).json({
        success:false,
        message:"Admin account is not found"})

        const user= await User.findOne({
        _id: req.body.id
       })  
       if(!user)
        // else than admin you do not hav accss to create a user
         return res.status(404).json({
        success:false,
        message:"User is not found"})
        
       //Backend-session-7
        await user.updateOne({isActive:false})

         return res.status(200).json({
            success:true,
            data:
            user
        })
    }catch(err){
        return res.status(500).json({
             success:false,
             message:err.message})
    }
}


//user 
//getProfile
exports.getProfile= async(req,res)=>{
    try{
        const user = await User.findOne({
            _id:req.body.id
        })
        if (!user){
               return res.status(404).json({
        success:false,
        message:"User is not found"})
        
        }
         return res.status(200).json({
             success:true,
             data: user})
    }catch(err){
          return res.status(500).json({
             success:false,
             message:err.message})
    }
}
