import mongoose, { Schema } from 'mongoose';

const CartDetail = Schema({
    cartId: { type: Schema.Types.ObjectId, ref: 'Cart' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    size: Number,
    qty: Number,
});

const Cart = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    details: [{ type: Schema.Types.ObjectId, default: [], ref: 'CartDetail' }],
});

export const CartDetailModel = mongoose.model('CartDetail', CartDetail);
export const CartModel = mongoose.model('Cart', Cart);
