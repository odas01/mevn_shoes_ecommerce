import mongoose from 'mongoose';

const Category = new mongoose.Schema({
    name: { type: String },
    vnname: { type: String },
    types: { type: Array },
    thumbnail: {},
    open: { type: Boolean, default: false },
});

export default mongoose.model('Category', Category, 'categorys');
