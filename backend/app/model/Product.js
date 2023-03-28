import mongoose, { Schema } from 'mongoose';

const Product = new mongoose.Schema({
    name: { type: String, required: true },
    image: {},
    otherImages: [{ type: Schema.Types.ObjectId, default: [], ref: 'Image' }],
    category: { type: String },
    type: { type: String },
    price: { type: Number },
    discount: { type: Number },
    size: { type: Array },
    stock: { type: Number, default: 100 },
    description: { type: String },
    open: { type: Boolean, default: false },
});

export default mongoose.model('Product', Product, 'products');
