// Backend-Session-7 and 8

const Product= require('../models/productSchema')
const User= require('../models/userSchema')
const Company= require('../models/companySchema')

//client users and admin

//Client Users and Admin can create and edit products
exports.createProduct= async(req,res)=>{
    try{
        // Backend-Session-7 
        //findOne({filtering fields})=> gets one document 
     
        const user= await User.findOne({
            _id: req.user.id,
            role:{
                $in:['admin','userClient']
            }
        })
        if(!user) // if user is not of roles admin or clientcompany, don't allow=> unauthorized action
            return res.status(401).json({
             success:false,
            message:"Only registered client company user and admin can create product should be signed up"})

// if user is client user, he/she should have a company to add product referencing it, else , cannot do it

     

       if( user.role ==='userClient' && !user.company){
               return res.status(400).json({
             success:false,
            message:"user should have a company to add it's products, assign company and try again"})
        }
        
        else if( user.role ==='userClient' && user.company){


        //checking if company is in db/ collection Company 
        //(maybe got deleted)
        let companyExists= await Company.findOne({
            _id: req.body.company
        }
    )
    console.log(companyExists)

        if(!companyExists){
  return res.status(404).json({
             success:false,
            message:"This company is not found"})
        }
        if(user.company !== req.body.company.toString())
             return res.status(401).json({
             success:false,
            message:"Client company user create product for his/her own company"})
    
             }
            
            //Backend-Session-7
            //MAKE SURE REQUIRED FIELDS ARE NOT EMPTY
            if( !req.body.name || !req.body.company || !req.body.category || !req.body.currentWarehouse || !req.body.stock || !req.body.SKU )
            return res.status(400).json({
        success:false,
        message:"Missing required Fields!"})

        //backend session 7
        //create a new product document, through create() and give fields to save to this document
        const product= await Product.create({
            name:req.body.name,
            company:req.body.company,
            currentWarehouse:req.body.currentWarehouse,
            stock:req.body.stock,
            SKU:req.body.SKU,
            category:req.body.category,
        })
    
        // return response with status of 201=> created and success field of true, message and new data saved to db
         return res.status(201).json({
            success:true,
            message:"Product is succssfully created",
            data: product})
 
        }catch(err){
            //500 error in server side
             return res.status(500).json({
             success:false,
             message:err.message})

        }
}

//Client Users and Admin can create and edit products
exports.editProduct= async(req,res)=>{
    try{
        //make sure user is authorized and is in db
        const user= await User.findOne({
            _id: req.user.id,
            role:'clientCompany' || 'admin'
        })
        if(!user)
            return res.status(401).json({
             success:false,
            message:"Only registered client company user and admin can create product and should be signed up"})

        // if user client check if user client works in company
        const clientCompanyId= user.company.toString()

        const companyExists= await Company.findOne({
            _id: clientCompanyId
        })

        //company is not in db
        if(!companyExists){
  return res.status(404).json({
             success:false,
            message:"Cannot find company"})
        }
     
    
        const product= await Product.findOne({
            _id:req.body.id
        })
    
        //404 not found status
        //backend session 7
        if (!product)
               return res.status(404).json({
             success:false,
            message:"product cannot be found"})

            //client belongs to only on company,so we can allow only the client to edit product owned by his/her company
               if(clientCompanyID !== product.company)
             return res.status(401).json({
             success:false,
            message:"Client company user update product for his/her own company"})

            //i want to build updating fields as key/value to use it in updateOne() using mongoose
            //Backend-Session-7
            let fieldsToUpdate={}
  

            //if not empty in request body then add to fields to update to the selected document
        if(req.body.SKU)
            fieldsToUpdate.SKU= req.body.SKU

        if(req.body.name)
             fieldsToUpdate.name= req.body.name

        if(req.body.desc)
             fieldsToUpdate.desc= req.body.desc

        if(req.body.category)
             fieldsToUpdate.category= req.body.category

         if(req.body.unit)
            fieldsToUpdate.unit= req.body.unit

        
          if(req.body.weight)
            fieldsToUpdate.weight= req.body.weight
        
           if(req.body.length)
             fieldsToUpdate.dimensions.length= req.body.length

            if(req.body.width)
            fieldsToUpdate.dimensions.width=req.body.width
         if(req.body.height)
            fieldsToUpdate.dimensions.height=req.body.height
        
          if(req.body.dimensionUnit)
            fieldsToUpdate.dimensions.dimensionUnit=req.body.dimensionUnit
        
            if(req.body.barCode)
            fieldsToUpdate.barCode=req.body.barCode
        
            //Backend-Session-7
            //update one is an async function ,needing to wait for the res by await keyword, returns a promise
            await product.updateOne(fieldsToUpdate)
     
         return res.status(200).json({
            success:true,
            message:"Product is succssfully updated"})
 
        }catch(err){
             return res.status(500).json({
             success:false,
             message:err.message})

        }
}
