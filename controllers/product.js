import { Products } from "../models/Product.js";
import mongoose from "mongoose";

//add product
export const addProduct = async (req, res) => {
  // take input for image add
  try {
    const { title, description, price, category, qty, imgsrc, createdAt } =
      req.body;

    //store into db
    const product = await Products.create({
      title,
      description,
      price,
      category,
      qty,
      imgsrc,
      createdAt,
    });
    res.json({ message: "product added successfully...", product });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//get all products

export const getAllProduct = async (req, res) => {
  try {
    // Fetch all products sorted by creation date (newest first)
    const products = await Products.find().sort({ createdAt: -1 });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    return res.status(200).json({ message: "Successfully retrieved all products.", products });
  } catch (error) {
    // Return a proper error response in case of server error
    return res.status(500).json({ message: "Error retrieving products.", error: error.message });
  }
};


// find product by id 
export const getProductById = async (req, res) => {

    const id = req.params.id;

    const product = await Products.findById(id);
    if (!product) return res.json({ message: "Invalid id......" });
    return res.json({ message: "specific products", product });

};


//update product by id
export const updateproductById = async (req, res) => {
    //   try {
        const id = req.params.id;
         const update = req.body    
        const product = await Products.findByIdAndUpdate(id,update,{new:true});
        if (!product) return res.json({ message: "Invalid id......" });
        return res.json({ message: "product is updated products", product });
    //   } catch (error) {}
    };

// delete product by id
    export const deleteproductById = async (req, res) => {
       
            const id = req.params.id;
          
            const product = await Products.findByIdAndDelete(id);
            if (!product){
               return res.json({ message: "Invalid id......","delete":false ,id});
            }else{
              return res.json({ message: "product is deleted successfully", product ,"delete":true});
       
            }
        };