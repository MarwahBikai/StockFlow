//backend session 10
//get express instance
const express=require('express')
//get app router from express functions to create a new router
const router=express.Router()
//get controllers functions to link with endpoints
const controller=require('../controllers/companyController')
const usercontroller=require('../controllers/userController')


router.get('/get-companies',controller.protect,controller.getClientCompanies)
router.post('/create-company',controller.protect,controller.createclientCompany)
router.patch('/edit-company',controller.protect,controller.editCompany)
router.patch('/deactivate-company',controller.protect,controller.deactivateCompany)




module.exports=router