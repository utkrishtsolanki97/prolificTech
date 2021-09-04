import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    },
    order_items : [
        {
            productName: { type : String , required : true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref : 'User' },
            quantity : { type : Number , required : true },
            price : { type : Number , required : true },
        }
    ],
    shipping_address : {
        address : { type : String , required : true },
        city : { type : String , required : true },
        postalCode : { type : String , required : true },
        country : { type : String , required : true }
    },
    payment_method : {
        type: String,
        required: true,
    },
    payment_result: {
        id : { type : String },
        status : { type : String },
        update_time : { type : String },
        email : { type : String },
    },
    tax_price : {
        type: Number,
        required: true,
        default: 0.0
    },
    shipping_price : {
        type: Number,
        required: true,
        default: 0.0
    },
    total_price : {
        type: Number,
        required: true,
        default: 0.0
    },
    is_paid : {
        type: Boolean,
        required: true,
        default: false,
    },
    ordered_on : {
        type: Date,
    },
    paid_at : {
        type: Date,
    },
    is_delivered : {
        type: Boolean,
        default:false
    },
    delivered_at : {
        type: Date
    },
    
    
    
},{
    timestamp: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order