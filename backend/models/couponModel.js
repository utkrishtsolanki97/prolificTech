import mongoose from 'mongoose';

const couponSchema = mongoose.Schema({
    couponCode: { type: String, required: true },
    created_by : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    },
    created_on : {
        type: Date,
    },
    valid_from : {
        type: Date,
        required: true,
    },
    valid_till : {
        type: Date,
        required: true,
    },
    discountPercentage : {
        type: Number,
        required: true,
    },
    max_discount : {
        type: Number,
    },
},{
    timestamp: true
})

const Coupon = mongoose.model('Coupon', couponSchema)

export default Coupon