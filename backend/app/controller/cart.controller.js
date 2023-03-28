import {
    CartModel as Cart,
    CartDetailModel as CartDetail,
} from '../model/Cart.js';

export const add = async (req, res, next) => {
    const { productId, size, qty } = req.body;
    const cartId = req.params.cartId;
    await Cart.findById(cartId)
        .populate('details')
        .then(async (cart) => {
            const filter = cart.details.find(
                (detail) =>
                    detail.productId.toString() === productId &&
                    detail.size === size
            );

            if (filter) {
                filter.qty += qty;
                await CartDetail.updateOne(
                    { _id: filter._id },
                    { qty: filter.qty },
                    { new: true, update: true }
                );
            } else {
                const newDetail = await CartDetail.create({
                    cartId: cart._id,
                    productId,
                    size,
                    qty,
                });
                await Cart.updateOne(
                    { _id: cartId },
                    {
                        $push: { details: newDetail._id },
                    },
                    { new: true, update: true }
                );
            }
        });

    const abc = await Cart.find().populate('details');
    res.send(abc);
};
export const findAll = async (req, res, next) => {
    const carts = Cart.find({})
        .populate('details')
        .populate({
            path: 'details',
            populate: { path: 'productId', select: 'name price -_id' },
        })
        .then((carts) => res.send(carts));
};
export const findOne = async (req, res, next) => {
    Cart.findById({ _id: req.params.cartId })
        .populate('details')
        .populate({
            path: 'details',
            populate: {
                path: 'productId',
                select: 'name price stock image',
            },
        })
        .then((carts) => res.send(carts))
        .catch((e) => res.send(e));
};
export const update = async (req, res, next) => {
    const details = req.body;

    details.forEach(async (detail) => {
        await CartDetail.updateOne(
            { _id: detail._id },
            {
                qty: detail.qty,
            },
            { new: true, update: true }
        );
    });

    res.send({ message: 'suscer' });
};
export const deletee = async (req, res) => {
    if (req.query.detailId) {
        await Cart.findByIdAndUpdate(req.params.cartId, {
            $pull: { details: req.query.detailId },
        });
        await CartDetail.findByIdAndDelete(req.query.detailId);
    } else {
        await Cart.findByIdAndUpdate(req.params.cartId, {
            details: [],
            returnDocuments: false,
        }).then((cart) => {
            cart.details.forEach(async (item) => {
                await CartDetail.findByIdAndDelete(item);
            });
        });
    }
    res.send({ message: 'delete successfully' });
};
export const quantity = async (req, res, next) => {
    Cart.findById(req.params.cartId)
        .then((carts) => res.send({ quantity: carts.details.length }))
        .catch((e) => res.send(e));
};
