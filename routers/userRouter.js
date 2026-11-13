//backend session 10
//get express instance
const express=require('express')
//get app router from express functions to create a new router
const router=express.Router()
//get controllers functions to link with endpoints
const controller=require('../controllers/userController')

//post method, creating account
router.post('/signup',controller.signup)
router.post('/login',controller.login)
//patch method, changing password
router.patch('/change-password',controller.protect,controller.changePassword)
//get method, admin getting users
//all these routes: //backend session 10

// endpoint and controller function link, as in other routers
router.get('/get-users',controller.protect,controller.getUsers)
router.post('/create-user',controller.protect,controller.createUser)
router.patch('/edit-user',controller.protect,controller.editUser)
router.patch('/deactivate-user',controller.protect,controller.deactivateUser)
router.get('/get-profile',controller.protect,controller.getProfile)



//export to use this router in index.js
module.exports=router