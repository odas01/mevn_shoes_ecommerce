import mongoose, { Schema } from 'mongoose';

const Image = new mongoose.Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    type: { type: String, default: 'product' },
    data: {},
});

export default mongoose.model('Image', Image, 'images');
