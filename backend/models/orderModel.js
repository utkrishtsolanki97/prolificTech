import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    },
    orderItems : [
        {
            productName: { type: String, required: true },
            quantity: { type: Number, required: true },
            subCategory: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            HSN: { type: String, required: true },
            product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        }
    ],
    shippingAddress : {
        name : { type : String , required : true },
        addressName : { type : String},
        address : { type : String , required : true },
        city : { type : String , required : true },
        postalCode : { type : String , required : true },
        country : { type : String , required : true },
        phoneNumber : { type : Number , required : true }
    },
    payment_method : {
        type: String,
        required: true,
    },
    payment_result: {
        id : { type : String },
        status : { type : String },
        updated_time : { type : String },
    },
    itemsPrice : {
        type: Number,
        required: true,
        default: 0.0
    },
    tax : {
        type: Number,
        required: true,
        default: 0.0
    },
    shipping : {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice : {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid : {
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