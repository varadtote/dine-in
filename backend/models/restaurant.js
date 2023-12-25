const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemDescription: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  category: { type: String, required: true },
  itemImage: { type: String } // Assuming you store the image URL or file path
});

const restaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['CUSTOMER', 'ADMIN', 'OWNER'],
    default: 'OWNER'
  },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  account_balance: { type: Number, default: 100 },
  menu: { type: [menuSchema], default: null },
  orderHistory: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }], default: null }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
