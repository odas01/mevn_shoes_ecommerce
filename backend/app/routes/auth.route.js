import express from 'express';
import * as auth from '../controller/auth.controller.js';

const router = express.Router();

router.route('/').get(auth.findAll);

router.route('/regis').post(auth.regis);
router.route('/login').post(auth.login);

export default router;
