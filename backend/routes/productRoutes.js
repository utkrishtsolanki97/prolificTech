import express from 'express'
import { getRazorpayId } from '../controllers/orderController.js';
const router = express.Router()

import { createProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/productController.js';
import { protect, admin } from '../middlewear/authMiddlewear.js';

router.route('/').get(getProduct).post(protect, admin, createProduct)

router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

 
export default router