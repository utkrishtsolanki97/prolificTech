import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProduct = asyncHandler( async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    const keyword = req.query.keyword ? {
      productName:{
        $regex: req.query.keyword,
        $options:'i'
      }
    } : {}
    console.log(keyword);
    const products = await Product.find({ ...keyword })
    res.json(products)
    // res.json(Products)
})

const getProductById = asyncHandler( async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    }
    else{
        res.status(404).json({message: 'Sorry no Product found'})
    }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    // console.log(req);
    const product = new Product({
        subCategory: req.body.subCategory,
        productName: req.body.productName,
        description: req.body.description,
        HSN: req.body.HSN,
        actualPrice: req.body.actualPrice,
        discountedPrice: req.body.discountedPrice,
        images: req.body.images,
        review: [],
        stock: req.body.stock,
        user: req.User._id,
        return_type: req.body.return_type,
    })
  
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  })

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
  const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.remove()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404).json({message: 'Sorry no Product found'})
      throw new Error('Product not found')
    }
  })
  
  // @desc    Update a product
  // @route   PUT /api/products/:id
  // @access  Private/Admin
  const updateProduct = asyncHandler(async (req, res) => {
    // console.log('into update ================================');
    // console.log(req);
    // console.log(typeof(req.body.stock));
    const {
        productId,
        subCategory,
        productName,
        description,
        HSN,
        actualPrice,
        discountedPrice,
        images,
        // review,
        stock, 
        return_type,
    } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
        product.subCategory = subCategory
        product.productName= productName
        product.description= description
        product.HSN= HSN
        product.actualPrice= actualPrice
        product.discountedPrice= discountedPrice
        product.images= images
        product.stock= stock
        product.return_type = return_type
  
      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })


export {
    getProduct,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
}