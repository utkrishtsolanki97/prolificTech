import asyncHandler from 'express-async-handler'
import User from '../models/userModal.js'
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler( async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const { email, password } = req.body

    
    const user = await User.findOne({email})
    
    if (user && (await user.matchPassword(password))) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            isAdmin: user.isAdmin,
            deliveryAddress: user.deliveryAddress,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401)
        res.send('Invalid email or password')
        throw new Error('Invalid email or password')
    }

})


// @desc    Register a new User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler( async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    const { name, email, password, phoneNumber, gender, isAdmin } = req.body

    const userExists = await User.findOne({email})
    
    if (userExists) {
        res.status(400)
        res.send('User already exists. Try using different email ID')
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
        phoneNumber,
        gender,
        isAdmin
    })
    
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            isAdmin: user.isAdmin,
            deliveryAddress: user.deliveryAddress,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
    

})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler( async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

        // res.send('Success')

    const user = await User.findById(req.User._id)
    if(user){
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            isAdmin: user.isAdmin,
            deliveryAddress: user.deliveryAddress,
        })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler( async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    const user = await User.findById(req.User._id)
    console.log(req.body);
    if(user){
        user.name = req.body.updatedUser.name || user.name
        user.email = req.body.updatedUser.email || user.email
        user.deliveryAddress = req.body.updatedUser.deliveryAddress || user.deliveryAddress
        if(req.body.updatedUser.password){
        user.password = req.body.updatedUser.password 
        }
        user.phone_number = req.body.updatedUser.phone_number || user.phone_number
        
        

        const updatedUser = await user.save()

        if(updatedUser){
            return res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phoneNumber: updatedUser.phoneNumber,
                gender: updatedUser.gender,
                isAdmin: updatedUser.isAdmin,
                deliveryAddress: updatedUser.deliveryAddress,
                token: generateToken(updatedUser._id)
            })
        }
        }
    else{
        res.status(404)
        res.send('User not found')
        throw new Error('User not found')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })
  
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        res.send('User not found')
        throw new Error('User not found')
    }
})
  
  // @desc    Get user by ID
  // @route   GET /api/users/:id
  // @access  Private/Admin
  const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
  
    if (user) {
      res.json(user)
    } else {
      res.status(404)
      res.send('User not found')
      throw new Error('User not found')
    }
  })

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    // console.log(user);
    // console.log(req.body);
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber
      user.isAdmin = req.body.isAdmin

    //   console.log("user",user);
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404)
      res.send('User not found')
      throw new Error('User not found')
    }
  })



export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    
}