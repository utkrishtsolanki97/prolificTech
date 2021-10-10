import asyncHandler from 'express-async-handler'
import Banner from '../models/bannerModel.js'


// @desc    Find a coupon
// @route   GET /api/banner
// @access  Unrestricted
const getallBanner = asyncHandler( async(req, res) => {
  
    const banner = await Banner.find({})
    if (banner) {
        res.json(banner)
    }
    else{
        res.status(404).json({message: 'Sorry no Product found'})
    }
})

// @desc    Find a coupon
// @route   GET /api/coupon
// @access  Unrestricted
// const getAllCoupons = asyncHandler( async(req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   const coupon = await Coupon.find({}).sort( { "valid_till": -1 } )
//   if (coupon) {
//       res.json(coupon)
//   }
//   else{
//       res.status(404).json({message: 'Sorry no Product found'})
//   }
// })


  

// @desc    Create a coupon
// @route   POST /api/coupon
// @access  Private/Admin
// const createCoupon = asyncHandler(async (req, res) => {
//   // console.log(req);
//   const coupon = new Coupon({
//     couponCode: req.body.couponCode,
//     valid_from: req.body.valid_from,
//     valid_till: req.body.valid_till,
//     created_by: req.body.created_by,
//     created_on: Date.now(),
//     discountPercentage: req.body.discountPercentage,
//     max_discount: req.body.max_discount,
//   })

//   const createdCoupon = await coupon.save()
//   res.status(201).json(createdCoupon)
// })

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
// const deleteCoupon = asyncHandler(async (req, res) => {
//   const coupon = await Coupon.findOne({"couponCode":req.query.coupon})

//   if (coupon) {
//     await coupon.remove()
//     res.json({ message: 'Coupon Deleted' })
//   } else {
//     res.status(404).json({message: 'Sorry no Product found'})
//     throw new Error('Coupon not found')
//   }
// })

export {
    getallBanner
}