import express from 'express'
import {register,Userlogin,allUsers,profile,deleteUserByid}  from '../controllers/user.js'
import {Authenticated} from '../middlewares/Auth.js'
import {googleLogin} from '../controllers/googleLogin.js'
const router=express.Router()

//register user
router.post('/register',register)
// login router
router.post('/login',Userlogin)

//googleLogin
router.post("/google/auth",googleLogin)
//create a routes for allUsers 
router.get("/allusers",allUsers)

//routes for getUser profile 
router.get("/profile",Authenticated,profile)

//delete userby id
router.delete("/deleteuser/:id",deleteUserByid)
export default router  //this router export into server.js file











