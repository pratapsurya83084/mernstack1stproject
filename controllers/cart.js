


import { Cart } from "../models/Cart.js";
//middlwaeredd
export const addToCart = async (req, res) => {
  try {
    const { productid, title, price, qty, imgsrc } = req.body;
console.log("reciv cart :",productid,title,price,qty,imgsrc);

    // Validate input fields
    if (!productid || !title || !price || !qty || !imgsrc) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userId = req.user?._id; // Assuming `req.user` is populated via middleware
    console.log("User ID:", userId);
    console.log("Product ID:", productid);

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    // Create a new cart if one does not exist
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productid.toString() === productid.toString()
    );

    if (itemIndex > -1) {
      // Update quantity and price if item exists
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price += price * qty;
    } else {
      // Add new item to the cart
      cart.items.push({ productid, title, price, qty, imgsrc });
    }

    // Save the cart
    await cart.save();

    // Send success response
    return res.status(200).json({ message: "Items added to cart successfully", cart });
  } catch (error) {
    // Catch and log errors
    console.error("Error in addToCart:", error.message);

    // Ensure response is sent only once
    if (!res.headersSent) {
      return res.status(500).json({
        message: "Internal Server Error.",
        error: error.message,
      });
    }
  }
};

//get user cart middlwaeredd

export const UserCart = async (req, res) => {
  const userId = req.user; //product cart userId
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    res.json({ message: "product is not exists in the cart.... " });
  }
  if (cart) {
    res.json({ message: "your cart product is :", cart });
  }
  return cart;
};

//delete/remove  product from cart middlwaeredd

export const removeproductFromCart = async (req, res) => {
  const { productId } = req.params; // Get productId from route params
  const userId = req.user; // Authenticated user's ID

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for the user." });
    }

    // Filter out the product that matches the productId
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.productid.toString() !== productId
    );

    // Check if the product was actually removed
    if (cart.items.length === initialLength) {
      return res
        .status(400)
        .json({ message: "Product not found in the cart." });
    }

    // Save the updated cart
    await cart.save();

    // Send success response
    res.json({
      message: "Product successfully removed from cart.",
      cart,
    });
  } catch (error) {
    console.error("Error removing product from cart:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};


//clear all cart items
export const clearCart = async (req, res) => {
  // const {productId} = req.params; // product cart userId
  const userId = req.user;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new compareSync.findOne({ items: [] });
    res.json({ message: "product is not exists in the cart.... " });
  } else {
    // allitemsid.items = cart.items.filter((item) => item.productid && item.productid.toString() !== productId);
    // await cart.save(); // Ensure the changes are saved to the database
    cart.items = [];
    res.json({ message: "all items is successfully removed from cart " });
  }
   cart.save();
};

//decrese qty from cart middlwaeredd
export const decreaseProductqty = async (req, res) => {
  const { qty, productid } = req.body; // Quantity to decrease and product ID
  const userId = req.user; // Replace with dynamic user ID as needed

  // Check if qty is a positive integer
  if (qty <= 0 || isNaN(qty)) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  // Find the user's cart
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    // No cart found for the user
    return res.status(404).json({ message: "Cart not found for user" });
  }

  // Find the index of the item to decrease qty
  const itemIndex = cart.items.findIndex(
    (item) => item.productid && item.productid.toString() === productid
  );

  if (itemIndex === -1) {
    // Item not found in the cart
    return res.status(404).json({ message: "Product not found in cart" });
  } else {
    // Decrease the quantity of the item
    cart.items[itemIndex].qty = qty-1;

    // If the quantity is 0 or less, remove the item from the cart
    if (cart.items[itemIndex].qty <= 0) {
      cart.items.splice(itemIndex, 1);
    }
  }

  // Save the updated cart to the database
  await cart.save();

  // Return the updated cart
  res.json({ message: "Cart item qty Decreased Updated successfully", cart });
};


// incsreaseQty auth middlwareeed
export const IncreaseProductqty = async (req, res) => {
  const { qty, productid } = req.body; // Quantity to decrease and product ID
  const userId = req.user; // Replace with dynamic user ID as needed

  // Check if qty is a positive integer
  if (qty <= 0 || isNaN(qty)) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  // Find the user's cart
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    // No cart found for the user
    return res.status(404).json({ message: "Cart not found for user" });
  }

  // Find the index of the item to decrease qty
  const itemIndex = cart.items.findIndex(
    (item) => item.productid && item.productid.toString() === productid
  );

  if (itemIndex === -1) {
    // Item not found in the cart
    return res.status(404).json({ message: "Product not found in cart" });
  } else {
    // Decrease the quantity of the item
    cart.items[itemIndex].qty = qty+1;

    // If the quantity is 0 or less, remove the item from the cart
    if (cart.items[itemIndex].qty <= 0) {
      cart.items.splice(itemIndex, 1);
    }
  }

  // Save the updated cart to the database
  await cart.save();

  // Return the updated cart
  res.json({ message: "Cart item qty Increased Updated successfully", cart });
};


