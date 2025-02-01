import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";
import Otp from "../models/userSchema.js";

export const addToCart = async (req, res) => {
  const { userID, productId } = req.query;
  try {
    if (!userID || !productId) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const user = await Otp.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyExist = await Cart.findOne({ userID, productId });
    if (alreadyExist) {
      await Cart.findOneAndUpdate(
        { userID, productId },
        { $inc: { quantity: 1 } }
      );
      return res
        .status(200)
        .json({ message: "Product quantity updated in cart" });
    }
    const cart = await Cart.create({ userID, productId, quantity: 1 });
    res.status(201).json({ cart });
  } catch (error) {
    console.error("Error during add to cart:", error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};
