import mongoose, { Schema } from 'mongoose';

const OrderDetail = Schema();

const Order = new mongoose.Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        address: { type: String },
        message: { type: String },
        ship: { type: String },
        shipCost: { type: Number },
        phone: { type: String, default: '0123456789' },
        method: { type: String, default: 'COD' },
        status: { type: String, default: 'Pending' },
        discount: { type: Number },
        details: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product' },
                size: Number,
                qty: Number,
                price: Number,
            },
        ],
        qty: { type: Number },
        total: { type: Number },
    },
    { timestamps: true }
);

export default mongoose.model('Order', Order);
