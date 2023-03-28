import Category from '../model/Category.js';

export const create = async (req, res, next) => {
    const category = new Category(req.body);
    if (req.body.thumbnail)
        req.body.thumbnail = new Buffer(req.body.thumbnail, 'base64');
    category
        .save()
        .then((category) => res.send(category))
        .catch((e) => res.send(e));
};
export const findAll = async (req, res, next) => {
    Category.find({})
        .then((categorys) => res.send(categorys))
        .catch((e) => res.send(e));
};
export const findOne = async (req, res, next) => {
    Category.findOne({ _id: req.params.id })
        .then((category) => res.send(category))
        .catch((e) => res.send(e));
};
export const update = async (req, res, next) => {
    if (req.body.thumbnail)
        req.body.thumbnail = new Buffer(req.body.thumbnail, 'base64');

    Category.updateOne({ _id: req.params.id }, req.body)
        .then((message) => res.send(message))
        .catch((e) => res.send(e));
};
export const deletee = async (req, res) => {
    Category.deleteOne({ _id: req.params.id })
        .then((message) => res.send(message))
        .catch((e) => res.send(e));
};
export const search = async (req, res, next) => {
    Category.find({
        name: { $regex: new RegExp(req.query.name), $options: 'i' },
    })
        .then((categorys) => res.send(categorys))
        .catch((e) => res.send(e));
};
export const filter = async (req, res, next) => {
    Category.find({ types: req.query.type })
        .then((category) => res.send(category))
        .catch((e) => res.send(e));
};
