import express from 'express';
import * as products from '../controller/product.controller.js';
import Filter from '../middleware/Filter.js';

const router = express.Router();

router
    .route('/')
    .get(products.findAll)
    .post(products.create)
    .delete(products.deleteAll);

router.route('/search').get(products.search);
router.route('/filter').get(Filter, products.filter);

router
    .route('/:id')
    .get(products.findOne)
    .put(products.update)
    .delete(products.deletee);

export default router;
