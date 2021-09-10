import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const addressSchema = mongoose.Schema({
    addressName: { type: String },
    name: {type: String},
    address: { type: String },
    city: { type: String },
    postalCode: { type: Number },
    country: { type: String },
    phoneNumber : { type: Number }
})

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    phoneNumber : {
        type: Number,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    isAdmin : {
        type: Boolean,
        required: true,
        default: false
    },
    deliveryAddress : [addressSchema]
    
    
    
},{
    timestamp: true
})



userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User