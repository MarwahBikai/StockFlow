//backend session 10
//get express instance
const express=require('express')
//get app router from express functions to create a new router
const router=express.Router()
//get controllers functions to link with endpoints
const controller=require('../controllers/productController')
const usercontroller=require('../controllers/userController')

//all these routes: //backend session 10

// post endpoint, have this request as protected request checking logged in user and set req.user to the currently logged in user

router.post('/create-product',usercontroller.protect,controller.createProduct)
// patch endpoint, have this request as protected request checking logged in user and set req.user to the currently logged in user
router.patch('/edit-product',usercontroller.protect,controller.editProduct)



//export to use this router in index.js
module.exports=router