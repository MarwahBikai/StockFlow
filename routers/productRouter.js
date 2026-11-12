//backend session 10
//get express instance
const express=require('express')
//get app router from express functions to create a new router
const router=express.Router()
//get controllers functions to link with endpoints
const controller=require('../controllers/productController')
const usercontroller=require('../controllers/userController')



router.post('/create-product',usercontroller.protect,controller.createProduct)
router.patch('/edit-product',usercontroller.protect,controller.editProduct)




module.exports=router