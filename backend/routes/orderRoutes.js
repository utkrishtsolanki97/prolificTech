import express from 'express'
const router = express.Router()
import { addOrderItems, getMyOrder, getOrderById, updateOrderToPaid } from '../controllers/orderController.js';
import { protect } from '../middlewear/authMiddlewear.js';

router.route('/').post(protect, addOrderItems)

router.route('/myorders').get(protect, getMyOrder)



router.route('/:id').get(protect, getOrderById)

router.route('/:id/pay').put(protect, updateOrderToPaid)




 
export default router