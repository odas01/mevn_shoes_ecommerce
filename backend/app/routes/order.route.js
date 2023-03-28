import express from 'express';
import * as orders from '../controller/order.controller.js';

const router = express.Router();

router.route('/').get(orders.findAll);

router.route('/search').get(orders.search);

router.route('/:userId').get(orders.findOne).post(orders.create);

export default router;
