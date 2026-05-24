import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true, default: 'Karachi' },
  },
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
    },
  ],
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true }, // 'cod', 'jazzcash', 'easypaisa', 'card'
  status: { type: String, default: 'pending' }, // 'pending', 'preparing', 'delivered'
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
