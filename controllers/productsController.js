// Backend-Session-7 and 8

const Product= require('../models/productSchema')
const User= require('../models/userSchema')
const Company= require('../models/companySchema')

//client users and admin

exports.createProduct= async(req,res)=>{
    try{
        // Backend-Session-7 
        //findOne({filtering fields})=> gets one document 

        const user= await User.findOne({
            _id: req.user.id,
            role:'clientCompany' || 'admin'
        })
        if(!user) // if user is not of roles admin or clientcompany, don't allow=> unauthorized action
            return res.status(401).json({
             success:false,
            message:"Only client company user and admin can create product should be signed up"})

        // if user client check if user client works in company
        const clientCompanyId= user.company.toString()

        //checking if company is in db/ collection Company 
        //(maybe got deleted)
        const companyExists= await Company.findOne({
            _id: clientCompanyId,
            isActive:true
        })

        if(!companyExists){
  return res.status(404).json({
             success:false,
            message:"This company is not found or is not active"})
        }
        if(clientCompanyID !== user.body.companyID)
             return res.status(401).json({
             success:false,
            message:"Client company user create product for his/her own company"})
    

            //Backend-Session-7
            //MAKE SURE REQUIRED FIELDS ARE NOT EMPTY
            if( !req.body.name || !req.body.company || !req.body.currentWarehouse || !req.body.stock || !req.body.SKU )
            return res.status(400).json({
        success:false,
        message:"Missing required Fields!"})

        const product= await Product.create({
            name:req.body.name,
            company:req.body.company,
            currentWarehouse:req.body.currentWarehouse,
            stock:req.body.stock,
            SKU:req.body.SKU,
            category:req.body.category,
        })
    
         return res.status(201).json({
            success:true,
            message:"Product is succssfully created",
            data: product})
 
        }catch(err){
             return res.status(500).json({
             success:false,
             message:err.message})

        }
}

exports.editProduct= async(req,res)=>{
    try{
        const user= await User.findOne({
            _id: req.user.id,
            role:'clientCompany' || 'admin'
        })
        if(!user)
            return res.status(401).json({
             success:false,
            message:"Only client company user and admin can create product and should be signed up"})

        // if user client check if user client works in company
        const clientCompanyId= user.company.toString()

        const companyExists= await Company.findOne({
            _id: clientCompanyId
        })

        if(!companyExists){
  return res.status(404).json({
             success:false,
            message:"Cannot find company"})
        }
     
    
        const product= await Product.findOne({
            _id:req.body.id
        })
    
        if (!product)
               return res.status(404).json({
             success:false,
            message:"product cannot be found"})

               if(clientCompanyID !== product.company)
             return res.status(401).json({
             success:false,
            message:"Client company user update product for his/her own company"})

            //i want to build updating fields as key/value to use it in updateOne() using mongoose
            //Backend-Session-7
            let fieldsToUpdate={}
  

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
            await product.updateOne(fieldsToUpdate)
     
         return res.status(200).json({
            success:true,
            message:"Product is succssfully updated",
            data: product})
 
        }catch(err){
             return res.status(500).json({
             success:false,
             message:err.message})

        }
}
