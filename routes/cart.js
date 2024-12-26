import {addToCart,UserCart,removeproductFromCart,clearCart,decreaseProductqty,IncreaseProductqty} from '../controllers/cart.js'
import express from 'express'

import { Authenticated,AuthCart ,AuthAddCart,RemovefromCart,decsreaseQty,incsreaseQty} from '../middlewares/Auth.js'

const router=express.Router()
//add cart router
router.post("/add",AuthCart,addToCart) //Authenticated


//get user cart product
router.get("/userCart",AuthAddCart,UserCart)

//remove from cart Router
router.delete("/removeCart/:productId",RemovefromCart,removeproductFromCart)

//remove all items from cart
router.delete("/clear",RemovefromCart,clearCart)

//decrese item qty
router.post("/--qty",decsreaseQty,decreaseProductqty)

//decrese item qty
router.post("/--incqty",incsreaseQty,IncreaseProductqty)
export default router 