//backend session 10
//get express instance
const express=require('express')
//get app router from express functions to create a new router
const router=express.Router()
//get controllers functions to link with endpoints
const controller=require('../controllers/companyController')
const usercontroller=require('../controllers/userController')

//all these routes: //backend session 10
// get endpoint, have this request as protected request checking logged in user and set req.user to the currently logged in user

router.get('/get-companies',usercontroller.protect,controller.getClientCompanies)
// post endpoint, have this request as protected request checking logged in user and set req.user to the currently logged in user

router.post('/create-company',usercontroller.protect,controller.createclientCompany)
// patch endpoint, have this request as protected request checking logged in user and set req.user to the currently logged in user

router.patch('/edit-company',usercontroller.protect,controller.editCompany)
router.patch('/deactivate-company',usercontroller.protect,controller.deactivateCompany)



//export to use this router in index.js
module.exports=router