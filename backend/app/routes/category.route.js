import express from 'express';
import * as categorys from '../controller/category.controller.js';

const router = express.Router();

router.route('/').get(categorys.findAll).post(categorys.create);

router.route('/filter').get(categorys.filter);
router.route('/search').get(categorys.search);

router
    .route('/:id')
    .get(categorys.findOne)
    .put(categorys.update)
    .delete(categorys.deletee);

export default router;
