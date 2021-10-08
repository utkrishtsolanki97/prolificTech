import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import shortid from 'shortid'
import Razorpay from 'razorpay'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'prolifictechshopofficial@gmail.com',
    pass: 'ProlificTech1#',
  }
  });

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
    console.log('hey');
    console.log(req);
    const order = await Order.findById(req.params.id)
    console.log(order);
    console.log('hey');
    if (order) {
      order.is_delivered = true
      order.delivered_at = Date.now()
  
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
  const key = process.env.NODE_ENV === 'development' ? process.env.razorpay_test_key : process.env.razorpay_prod_key
  const password = process.env.NODE_ENV === 'development' ? process.env.razorpay_test_secret : process.env.razorpay_prod_secret
  console.log(key,'-',password);
    var razorpay = new Razorpay({ key_id: key, key_secret: password })
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

  const sendmail = () => {
    
    
      const mailData = {
          from: 'prolifictechshopofficial@gmail.com',  // sender address
          to: 'utkrishtsolanki97@gmail.com',   // list of receivers
          subject: 'Sending Email using Node.js',
          text: 'That was easy!',
          html: '<><b>Hey there! </b><br> This is our first message sent with Nodemailer<br/></>',
        };

        transporter.sendMail(mailData, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
        });
  }


export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getRazorpayId,
    getOrders,
    updateOrderToDelivered,
    sendmail,
}