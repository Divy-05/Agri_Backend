import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  shop: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop', 
      required: true
    },

    name: {
      type: String,
      // required: true
    },

    category: {
      type: String,
      // required: true
    },

    size : {
      type: String,
      // required: true,
    },

    color : {
      type: String,
      // required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    priceAtTimeOfAddition: {
      type: Number,
      required: true
    },

  }],
  total: { type: Number, default: 0 }, 

});

const Cart =  mongoose.model('Cart', CartSchema);
export default Cart;
