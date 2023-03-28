import express from 'express';
import * as carts from '../controller/cart.controller.js';

const router = express.Router();

router.route('/').get(carts.findAll);

router
    .route('/:cartId')
    .get(carts.findOne)
    .post(carts.add)
    .put(carts.update)
    .delete(carts.deletee);

router.route('/:cartId/quantity').get(carts.quantity);

export default router;
