import jwt from'jsonwebtoken'
import User from "../models/userModal.js"
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async(req,res,next) => {
    let token
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            token= req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded);
            req.User = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            res.status(401)
            throw new Error('Not Authorsed, token Failed')
            
        }
    }
    if (!token) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.status(401)
        throw new Error('Not authorise, no token')
    }

})

const admin = (req, res, next) => {
    if (req.User && req.User.isAdmin) {
      next()
    } else {
      res.status(401)
      res.send('Not authorized as an admin')
      throw new Error('Not authorized as an admin')
    }
  }
  

export { protect, admin }