import Order from '../model/Order.js';
import Product from '../model/Product.js';

export const create = async (req, res, next) => {
    await Order.create(req.body);

    await req.body.details.forEach(async (item) => {
        await Product.updateOne(
            { _id: item.productId },
            { $set: { stock: item.newStock } },
            { new: true, update: true }
        );
    });
    res.send({ message: 'Create orther successfully.' });
};
export const findAll = async (req, res, next) => {
    Order.find({})
        .then((orders) => res.send(orders))
        .catch((e) => res.send(e));
};
export const findOne = async (req, res, next) => {
    Order.findById(req.params.userId)
        .populate({
            path: 'details',
            populate: { path: 'productId', select: 'name price -_id' },
        })
        .populate('userId', 'email -_id')
        .then((order) => res.send(order))
        .catch((e) => res.send(e));
};
export const search = async (req, res, next) => {
    const phone = req.query.phone;
    Order.find({ phone: new RegExp(phone), $options: 'i' })
        .then((orders) => res.send(orders))
        .catch((e) => res.send(e));
};
