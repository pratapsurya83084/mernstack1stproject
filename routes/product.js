import express from 'express'
import {addProduct,getAllProduct,getProductById,updateproductById,deleteproductById}  from '../controllers/product.js'


const router=express.Router()

//addproduct 
router.post('/addproducts',addProduct)
//getall product
router.get("/getallproduct",getAllProduct)

//get product by id
router.get("/:id",getProductById)

// routes for updated product by id
router.put("/:id",updateproductById) //.put method used for update

//delete product by id
router.delete("/:id",deleteproductById)





export default router 