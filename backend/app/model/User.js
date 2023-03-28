import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, unique: true, required: true, lowercase: true },
        password: { type: String },
        role: { type: String, default: 'user' },
        open: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model('User', User);
