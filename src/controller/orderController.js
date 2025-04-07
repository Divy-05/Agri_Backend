import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Cart from "../model/cartModel.js";

const createOrder = async (req, res) => {
    try {
      const { userId, cartId, shippingAddress, paymentMethod } = req.body;
  
      // 1. Check if the user exists by userId
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // 2. Get the cart using cartId
      const cart = await Cart.findById(cartId).populate("shop.product"); // Populate product details
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // 3. Calculate the total amount from cart items
      let total = 0;
      cart.shop.forEach(item => {
        total += item.product.price * item.quantity; // Assuming price is in the product model
      });
  
      // 4. Create a new order using the cart details
      const newOrder = new Order({
        user: userId,
        cart: cart._id, // Reference to cart
        shippingAddress,
        paymentMethod: paymentMethod || "COD", // Default to COD if not provided
        total,
      });
  
      // 5. Save the new order to the database
      await newOrder.save();
  
      // 6. Delete the cart after creating the order
      await Cart.findByIdAndDelete(cartId);
  
      // 7. Respond with the new order details
      res.status(201).json({
        message: "Order created successfully! Cart has been cleared.",
        order: newOrder,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating order", error: error.message });
    }
  };
  
// const createOrder = async (req, res) => {
//   try {
//     const { userId, cartId, shippingAddress, paymentMethod } = req.body;

//     // 1. Check if the user exists by userId
//     const existingUser = await User.findById(userId);
//     if (!existingUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 2. Get the cart using cartId
//     const cart = await Cart.findById(cartId).populate("shop.product");  // Populate product details
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     // 3. Calculate the total amount from cart items
//     let total = 0;
//     cart.shop.forEach(item => {
//       total += item.product.price * item.quantity; // Assuming price is in the product model
//     });

//     // 4. Create a new order using the cart details
//     const newOrder = new Order({
//       user: userId,
//       cart: cart._id, // Reference to cart
//       shippingAddress,
//       paymentMethod: paymentMethod || "COD", // Default to COD if not provided
//       total,
//     });

//     // 5. Save the new order to the database
//     await newOrder.save();

//     // 6. Respond with the new order details
//     res.status(201).json({
//       message: "Order created successfully!",
//       order: newOrder,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error creating order", error: error.message });
//   }
// };

// Get all orders (Optionally filter by user or order status)
const getOrders = async (req, res) => {
  try {
    const { userId, orderStatus } = req.query; // Filter by userId or orderStatus if provided

    let query = {};
    if (userId) query.user = userId;
    if (orderStatus) query.orderStatus = orderStatus;

    const orders = await Order.find(query).populate("user").populate("cart"); // Populate references to User and Cart

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving orders", error: error.message });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("user").populate("cart");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order retrieved successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving order", error: error.message });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      orderStatus,
      paymentStatus,
      paymentMethod,
      totalAmount,
      shippingAddress,
    } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus,
        paymentStatus,
        paymentMethod,
        totalAmount,
        shippingAddress,
      },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};

export { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };
