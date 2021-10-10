import express from 'express'
import { getallBanner } from '../controllers/bannerController.js';
const router = express.Router()
import { protect, admin } from '../middlewear/authMiddlewear.js';

router.route('/').get(getallBanner)

export default router