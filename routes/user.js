import express from 'express'
import {register,Userlogin,allUsers,profile,deleteUserByid,formLogout}  from '../controllers/user.js'
import {Authenticated} from '../middlewares/Auth.js'
import {getGoogleProfile, googleLogin,googleLogout} from '../controllers/googleLogin.js'
import { adminLogin,AdminLogout, ResetAdminPassword } from '../controllers/AdminLogin.js'
const router=express.Router()


router.get("/checkUserexists",Authenticated)

router.post("/adminlogin",adminLogin);

router.post("/adminlogout",AdminLogout);
//logout admin

//register user
router.post('/register',register)
// login router
router.post('/login',Userlogin)
router.post('/formLogout',formLogout)

//googleLogin
router.post("/google/auth",googleLogin)

//logout googleLogout
router.post("/googleLogout",googleLogout);
//create a routes for allUsers 
router.get("/allusers",allUsers)

//routes for getUser profile 
router.get("/profile",Authenticated,profile)
router.get("/googleprofile",Authenticated,getGoogleProfile)

//delete userby id
router.delete("/deleteuser/:id",deleteUserByid);

//update password
router.post("/admin/updatepassword",ResetAdminPassword);
export default router  //this router export into server.js file











