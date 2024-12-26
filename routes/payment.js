import express from 'express';
import { checkout, verifyPayment ,UserSpecificOrder,getAllorders} from '../controllers/Payment.js';
import {orderConfirm} from '../middlewares/Auth.js';
const router = express.Router();

// Checkout route
router.post('/checkout', checkout);

// Verify payment route (if needed)
router.post('/verify-payment', verifyPayment);

//user specific routes
router.get('/userorder',orderConfirm,UserSpecificOrder)

// routes for getallOrder
router.get('/allorder',getAllorders);

export default router;
