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
// @route   PUT /api/banner
// @access  Private/Admin
const updateBanner = asyncHandler(async (req, res) => {
  // console.log(req);
  let banner = await Banner.findById('6165cb1c12a14f9c06b0ce06')
    if (banner) {
      console.log(req.body);
      const bannernew= req.body.updatebanner
      banner.banner1=bannernew.banner1
      banner.banner2=bannernew.banner2
      const updatedBanner = await banner.save()
  
      res.json(updatedBanner)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
})

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
    getallBanner,
    updateBanner
}