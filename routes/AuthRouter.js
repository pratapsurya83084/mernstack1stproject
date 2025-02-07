import express from 'express';
import googleLogin  from '../controllers/authController.js';

const router=express();


router.get("/googlelogin",googleLogin)

export default router;