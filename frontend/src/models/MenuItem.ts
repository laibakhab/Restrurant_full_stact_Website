import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }], // 'veg', 'spicy', 'popular'
});

export default mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);
