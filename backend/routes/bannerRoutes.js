import express from 'express'
const router = express.Router()
import {  getUsers } from '../controllers/userController.js';
import { protect, admin } from '../middlewear/authMiddlewear.js';

router.route('/').put(protect, admin, getUsers)

export default router