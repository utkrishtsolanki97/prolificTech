import express from 'express'
import { getallBanner, updateBanner } from '../controllers/bannerController.js';
const router = express.Router()
import { protect, admin } from '../middlewear/authMiddlewear.js';

router.route('/').get(getallBanner).put(protect,admin,updateBanner)

export default router