import mongoose from 'mongoose'
import dotenv from 'dotenv';
import users from './data/user.js';
import products from './data/products.js';
import User from './models/userModal.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';
import Order from './models/orderModel.js';

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const sellerUser = await createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: sellerUser }
        })
        await Product.insertMany(sampleProducts)
        console.log('Data Importd');
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed');
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}
else{
    importData()
}