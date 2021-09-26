import express from 'express'
import { createCoupon, deleteCoupon, getAllCoupons, getCouponById } from '../controllers/couponController.js';
const router = express.Router()
import { protect, admin } from '../middlewear/authMiddlewear.js';

router.route('/').get(getCouponById).post(protect, admin, createCoupon).delete(protect, admin, deleteCoupon)

router.route('/getall').get(protect, admin, getAllCoupons)
 
export default router