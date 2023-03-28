import express from 'express';
import * as user from '../controller/user.controller.js';

const router = express.Router();

router.route('/').get(user.getAll);
router.route('/search').get(user.search);

router.route('/signin').post(user.signIn);
router.route('/signup').post(user.signUp);
router.route('/secret').get(user.secret);
router.route('/changePw').put(user.changePw);
router.route('/checkAdmin').get(user.checkAdmin);

router.route('/:userId').put(user.update).delete(user.deleteOne);

export default router;
