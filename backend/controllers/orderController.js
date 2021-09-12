import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import shortid from 'shortid'
import Razorpay from 'razorpay'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
      ordered_items,
      price,
      paymentStatus,
      address,
      paymentMethod,
    } = req.body

  
    if (ordered_items && ordered_items.length === 0) {
      res.status(400)
      throw new Error('No order items')
      return
    } else {
      const setOrder = !paymentStatus ? {
        orderItems: ordered_items,
        user: req.User._id,
        shippingAddress: address,
        payment_method :paymentMethod,
        itemsPrice: price.cartTotal,
        tax: price.tax,
        shipping: price.shipping,
        totalPrice: price.totalPayable,
        isPaid: false,
        ordered_on: Date.now(),
      } : {
        orderItems: ordered_items,
        user: req.User._id,
        shippingAddress: address,
        payment_method :paymentMethod,
        itemsPrice: price.cartTotal,
        tax: price.tax,
        shipping: price.shipping,
        totalPrice: price.totalPayable,
        payment_result: {
          id: paymentStatus.razorpay_payment_id,
          status: 'Paid',
          updated_time: Date.now()
        },
        isPaid: true,
        ordered_on: Date.now(),
        paid_at: Date.now()
      }
      const order = new Order(setOrder)
  
      const createdOrder = await order.save()
  
      res.status(201).json(createdOrder)
    
    }
  })
  
  // @desc    Get order by ID
  // @route   GET /api/orders/:id
  // @access  Private
  const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )
  
    if (order) {
      res.json(order)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
  
  // @desc    Update order to paid
  // @route   GET /api/orders/:id/pay
  // @access  Private
  const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
  
  // @desc    Update order to delivered
  // @route   GET /api/orders/:id/deliver
  // @access  Private/Admin
  const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
  
  // @desc    Get logged in user orders
  // @route   GET /api/orders/myorders
  // @access  Private
  const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.User._id })
    res.json(orders)
  })
  
  // @desc    Get all orders
  // @route   GET /api/orders
  // @access  Private/Admin
  const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
  })

// @desc    Setup Payment process 
// @route   POST /api/order/razorpay
// @access  Private

const getRazorpayId = asyncHandler( async(req, res) => {
    var razorpay = new Razorpay({ key_id: process.env.razorpay_test_key, key_secret: process.env.razorpay_test_secret })
    const {
        amount,
        currency,
    } = req.body
    const receipt = 'ProlificTech_'+shortid.generate()
    const options = {
        amount: amount*100,
        currency,
        receipt,
    }
    try {
		const response = await razorpay.orders.create(options)
		// console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
            receipt: response.receipt,
            created_at: response.created_at,
		})
	} catch (error) {
		console.log(error)
    console.log('hi')
	}
    
})


export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getRazorpayId,
    getOrders,
    updateOrderToDelivered,
}