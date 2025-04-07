import Cart from "../model/cartModel.js";
import Shop from "../model/shopModel.js";

// const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity, } = req.body;
//     const numericQuantity = parseInt(quantity, 10);

//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     const userId = req.user._id;

//     if (!numericQuantity || numericQuantity <= 0) {
//       return res.status(400).json({ message: "Invalid quantity" });
//     }

//     const product = await Shop.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     let cart = await Cart.findOne({ user: userId });
//     if (!cart) {
//       cart = new Cart({ user: userId, shop: [] });
//     }

//     const existingProductIndex = cart.shop.findIndex(
//       (item) => item.product.toString() === productId,
//     );

//     if (existingProductIndex > -1) {
//       cart.shop[existingProductIndex].quantity += numericQuantity; 
//     } else {
//       cart.shop.push({
//         product: productId,
//         quantity: numericQuantity,
//         priceAtTimeOfAddition: product.price,
//       }); 
//     }

//     await cart.save();

//     const total = cart.shop.reduce(
//       (sum, item) => sum + item.priceAtTimeOfAddition * item.quantity,
//       0
//     );

//     res.status(200).json({
//       message: "Product added to cart successfully",
//       cart,
//       total,
//     });
//   } catch (error) {
//     console.error("Cart addition error:", error);

//     if (error.name === "CastError") {
//       return res.status(400).json({ message: "Invalid product ID format" });
//     }

//     if (error.name === "ValidationError") {
//       return res.status(400).json({ message: error.message });
//     }

//     res.status(500).json({
//       message: "An error occurred while adding to cart",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Internal server error",
//     });
//   }
// };

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const numericQuantity = parseInt(quantity, 10);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userId = req.user._id;

    if (!numericQuantity || numericQuantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const product = await Shop.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, shop: [] });
    }

    const existingProductIndex = cart.shop.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingProductIndex > -1) {
      cart.shop[existingProductIndex].quantity += numericQuantity;
    } else {
      cart.shop.push({
        product: productId,
        quantity: numericQuantity,
        priceAtTimeOfAddition: product.price,
      });
    }

    const total = cart.shop.reduce(
      (sum, item) => sum + item.priceAtTimeOfAddition * item.quantity,
      0
    );

    cart.total = total;

    await cart.save();

    res.status(200).json({
      message: "Product added to cart successfully",
      cart,
      total, 
    });
  } catch (error) {
    console.error("Cart addition error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({
      message: "An error occurred while adding to cart",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const { productId, quantityToRemove } = req.params; 
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.shop.find((item) => item.product.toString() === productId);
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantityToRemove >= cartItem.quantity) {
      cart.shop = cart.shop.filter((item) => item.product.toString() !== productId);
    } else {
      cartItem.quantity -= quantityToRemove;
    }

    await cart.save();

    const total = cart.shop.reduce(
      (sum, item) => sum + item.priceAtTimeOfAddition * item.quantity,
      0
    );

    res.status(200).json({
      message: "Product quantity updated in cart successfully",
      cart,
      total,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating cart", error: error.message });
  }
};

const displayCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("shop.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const total = cart.shop.reduce(
      (sum, item) => sum + item.priceAtTimeOfAddition * item.quantity,
      0
    );

    res.status(200).json({
      message: "Cart retrieved successfully",
      cart,
      total,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cart", error: error.message });
  }
};

export { 
  addToCart, 
  removeFromCart, 
  displayCart 
};