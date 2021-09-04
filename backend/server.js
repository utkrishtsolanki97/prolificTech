import path from 'path'
import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import Product from './data/offlineProduct.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()
const app = express()

app.use(express.json())

// app.get('/', (req,res)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.send('API is Running.. .. ...')
// })

// app.get('/offline/products', (req,res)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.json(Product)
// })
// app.get('/offline/products/:id', (req,res)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     const product =  Product.find(item=> item._id == req.params.id)
//     if (product) {
//         res.json(product)
//     }
//     else{
//         res.status(404).json({message: 'Sorry no Product found'})
//     }
// })

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.listen(PORT,console.log(`Server Running on ${PORT}`))