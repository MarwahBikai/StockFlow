// Backend-Session-7 and 8

const Company= require('../models/companySchema')
const User= require('../models/userSchema')

//admin
//createCompany
//editCompany
//deactivateClientCompany
exports.getClientCompanies= async(req,res)=>{

    try{
    if(req.user.role !== 'admin')
       return res.status(403).json({message:"You are not authorized to view users"}) 
    
    const clientCompanies= await Company.find({})
    return res.status.json({
        success:true,
        data:clientCompanies
    })}
    catch(err){  return res.status(500).json({
             success:false,
             message:err.message})}
}

//create users Backend-Session-6
exports.createclientCompany= async(req,res)=>{
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

          if( !req.body.name || !req.body.email || !req.body.phoneNumber || !req.body.country || !req.body.city || !req.body.address || !req.body.type)
            return res.status(400).json({
        success:false,
        message:"Missing required Fields!"})
         
        const newCompany=await Company.create({
            name: req.body.name,
            officialWebsite: req.body.officialWebsite || "",
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            location:
            {
             country: req.body.country,
             city: req.body.city,
             address: req.body.address,
        },
          type: req.body.type,
          userClientCompanyType:req.body.userClientCompanyType || null,
          contactPerson:req.body.contactPerson || null,
          contractStartDate:req.body.contractStartDate || null,
    }


    )
        
        return res.status(201).json({
            success:true,
            message:"Company created successfully",
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
exports.editCompany= async(req,res)=>{
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

        const company= await User.findOne({
        _id: req.body.id
       })  
       if(!user)
        // else than admin you do not hav accss to create a user
         return res.status(404).json({
        success:false,
        message:"Company is not found"})
         

        let fieldsToUpdate={}

        if (req.body.name)
          fieldsToUpdate.name= req.body.name
         if (req.body.email)
          fieldsToUpdate.email= req.body.email
         if (req.body.officialWebsite)
          fieldsToUpdate.officialWebsite= req.body.officialWebsite
         if (req.body.phoneNumber)
          fieldsToUpdate.phoneNumber= req.body.phoneNumber

         if (req.body.country)
          fieldsToUpdate.location.country= req.body.country

           if (req.body.city)
          fieldsToUpdate.location.city= req.body.city

             if (req.body.address)
          fieldsToUpdate.location.address= req.body.address


          if (req.body.type)
          fieldsToUpdate.type= req.body.type

          if (req.body.userClientCompanyType)
          fieldsToUpdate.userClientCompanyType= req.body.userClientCompanyType

          if (req.body.contactPerson)
          fieldsToUpdate.contactPerson= req.body.contactPerson

          if (req.body.contractStartDate)
          fieldsToUpdate.contractStartDate= req.body.contractStartDate

          await company.updateOne(fieldsToUpdate)

        return res.status(200).json({
            success:true,
            data:
            company
        })

    }catch(err){
          return res.status(500).json({
             success:false,
             message:err.message})

    }
}
//deactivate users
exports.deactivateCompany=async(req,res)=>{
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

        const company= await Company.findOne({
        _id: req.body.id
       })  
       if(!company)
        // else than admin you do not hav accss to create a user
         return res.status(404).json({
        success:false,
        message:"company is not found"})
        
        company.isActive=false
        company.save()

         return res.status(200).json({
            success:true,
            data:
            company
        })
    }catch(err){
         return res.status(500).json({
             success:false,
             message:err.message})
    }
}