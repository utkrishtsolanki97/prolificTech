import express from 'express'
const router = express.Router()
import { addOrderItems, getMyOrders, getOrderById, getOrders, getRazorpayId, sendmail, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js';
import { admin, protect } from '../middlewear/authMiddlewear.js';

router.route('/sendmail').post(sendmail)


router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)

router.route('/myorders').get(protect, getMyOrders)

router.route('/razorpay').post(protect ,getRazorpayId)


router.route('/:id').get(protect, getOrderById)

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)



router.route('/:id/pay').put(protect, updateOrderToPaid )




 
export default router