import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name : { type : String , required : true },
    rating : { type : Number , required : true },
    comment : { type : String , required : true },
},{
    timestamp : true,
})



const productSchema = mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    },
    productName : {
        type: String,
        required: true
    },
    category : {
        type: String,
    },
    subCategory : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    HSN : {
        type: String
    },
    images : {
        type: Array,
        required: true,
    },
    actualPrice : {
        type : Number,
        required: true,
    },
    discountedPrice : {
        type : Number,
        required: true,
    },
    retun_type : {
        type: Boolean,
        required: true,
        default : true
    },
    stock : {
        type : Number,
        required: true,
        default: 500,
    },
    rating : {
        type: Number,
        required : true,
        default: 0
    },
    number_reviews : {
        type : Number,
        default : 0
    },
    reviews : [reviewSchema]
    
},{
    timestamp: true
})

const Product = mongoose.model('Product', productSchema)

export default Product