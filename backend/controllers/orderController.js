import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler( async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body
    

    // const x = {
    //     order_items: orderItems,
    //     user: req.User._id,
    //     shipping_address :shippingAddress,
    //     payment_method:paymentMethod, 
    //     tax_price : taxPrice, 
    //     shipping_price:shippingPrice, 
    //     total_price:totalPrice
    // }
    // console.log('into Order',x);
    

    if(orderItems  && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
        return
    }
    else{
        const x = {
            order_items: orderItems,
            user: req.User._id,
            shipping_address :shippingAddress,
            payment_method:paymentMethod, 
            tax_price : taxPrice, 
            shipping_price:shippingPrice, 
            total_price:totalPrice
        }
        const order = new Order({
            order_items: orderItems,
            user: req.User._id,
            shipping_address :shippingAddress,
            payment_method:paymentMethod, 
            tax_price : taxPrice, 
            shipping_price:shippingPrice, 
            total_price:totalPrice,
            ordered_on: Date.now()
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

// @desc    Get order by ID
// @route   GET /api/order/:id
// @access  Private

const getOrderById = asyncHandler( async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    
    const order = await Order.findById(req.params.id).populate('user','name email')
    
    console.log(order);
    if (order) {
        const x = res.json(order)
        console.log(x);
        res.json(order)
        
    }
    else{
        res.status(404).json({message: 'Sorry no Order found'})
    }
})

// @desc    Update order to paid
// @route   PUT /api/order/:id/pay
// @access  Private

const updateOrderToPaid = asyncHandler( async(req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    console.log('into ');
    const order = await Order.findById(req.params.id)
    console.log(order);
    if (order) {
        order.is_paid=true
        order.paid_at=Date.now()
        // order.paymentResult = {
        //     id:req.body.id,
        //     status: req.body.status,
        //     uptate_time: req.body.uptate_time,
        //     email_address: req.body.payer.email_address
        // }
        const updatedOrder = await order.save()
        console.log(updatedOrder);
        res.json(updatedOrder)
    }
    else{
        res.status(404).json({message: 'Sorry no Order found'})
    }
})

// @desc    Get orders of a user
// @route   PUT /api/order/myorders
// @access  Private

const getMyOrder = asyncHandler( async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    const orders = await Order.find({user: req.User._id})
    
        res.json(orders)
    
})


export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrder
}