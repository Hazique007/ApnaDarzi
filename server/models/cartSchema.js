import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Otp",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  // product: {
  //   type: Object,
  //   required: true,
  // },
  quantity: {
    type: Number,
    required: true,
  },

  //   price: {
  //     type: Number,
  //     required: true,
  //   },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
