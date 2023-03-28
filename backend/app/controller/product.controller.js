import Product from '../model/Product.js';
import Image from '../model/Image.js';

export const create = async (req, res, next) => {
    if (req.body.image) {
        req.body.image = Buffer.from(req.body.image, 'base64');
    }
    let otherImages = req.body.otherImages;
    delete req.body.otherImages;

    Product.create(req.body)
        .then(async (product) => {
            if (!!otherImages) {
                const otherImagesId = await Promise.all(
                    await otherImages.map(async (item) => {
                        let id = '';
                        await Image.create({
                            productId:product._id,
                            data: Buffer.from(item, 'base64'),
                        }).then(async (res) => {
                            id = res._id;
                        });
                        return id;
                    })
                );
                await Product.updateOne({_id:product._id}, {otherImages: otherImagesId});
            }
            res.send({message: 'Create product successfully.'})
        })
        .catch((e) => res.send(e));
};
export const findAll = async (req, res, next) => {
    const countDoc = await Product.countDocuments({});

    Product.find({})
        .sort({ _id: -1 })
        .skip(+req.query.skip)
        .limit(+req.query.limit)
        // .populate('otherImages', 'data')
        .then((products) =>
            res.send({
                products,
                totalProducts: countDoc,
            })
        )
        .catch((e) => res.send(e));
};
export const findOne = async (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .populate('otherImages', 'data')
        .then((product) => res.send(product))
        .catch((e) => res.send(e));
};
export const update = async (req, res, next) => {
    if (req.body.image) {
        req.body.image = Buffer.from(req.body.image, 'base64');
    }
    if (req.body.otherImages) {
        const otherImages = req.body.otherImages.map(
            (item) => Buffer.from(item, 'base64')
        );
        const otherImagesIds = await Promise.all(
            await otherImages.map(async (thumbnail) => {
                let id = '';
                await Image.create({
                    productId: req.params.id,
                    data: thumbnail,
                }).then(async (res) => {
                    id = res._id;
                });
                return id;
            })
        );
        req.body.otherImages = [...otherImagesIds];
    }

    Product.updateOne({ _id: req.params.id }, req.body)
        .then((message) => {
            res.send({ message: 123 });
        })
        .catch((e) => res.send(e));
};
export const deletee = async (req, res) => {
    await Image.deleteMany({productId: req.params.id})
    Product.deleteOne({ _id: req.params.id })
        .then((message) => res.send(message))
        .catch((e) => res.send(e));
};
export const deleteAll = async (req, res, next) => {
    Product.deleteMany({})
        .then((message) => res.send(message))
        .catch((e) => res.send(e));
};
export const search = async (req, res, next) => {
    const filter = {
        name: { $regex: new RegExp(req.query.name), $options: 'i' },
    };
    if (req.query.open) {
        filter.open = req.query.open;
    }
    Product.find(filter)
        .then((products) => res.send({ products }))
        .catch((e) => res.send(e));
};
export const filter = async (req, res, next) => {
    const countDoc = await Product.countDocuments({
        ...res.locals.filter,
        open: true,
    });

    Product.find({
        ...res.locals.filter,
        open: true,
    })
        .limit(res.locals.limit)
        .skip(res.locals.skip)
        .sort(res.locals.sort)
        .then((products) => {
            res.send({
                data: products,
                quantity: countDoc,
                last_page: Math.ceil(countDoc / res.locals.limit),
            });
        })
        .catch((e) => res.send(e));
};
