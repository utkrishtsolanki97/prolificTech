import axios from 'axios'
import React, { useReducer } from 'react'
import OrderContext from './OrderContext'
import OrderReducer from './OrderReducer'
import {  ADD_NEW_ORDER_FAILED, ADD_NEW_ORDER_REFRESH, ADD_NEW_ORDER_SUCCESS, GET_ALL_ORDERS, GET_RAZORPAY_ORDER_ID, GET_SINGLE_ORDERS, SET_ADDRESS, SET_CART_TOTAL, SET_LOADING, SET_ORDER_TO_DELIVERED, SET_PAYMENT_METHOD, SET_PAYMENT_STATUS, UPDATE_CART } from './type'

const OrderState = (props) => {

    const initialState = {
        loading: false,
        cart: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        deliveryAddress: {
            address: "",
            addressName: "",
            city: "",
            country: "",
            name: "",
            phoneNumber: 0,
            postalCode: 0
        },
        cartTotal: {},
        razorPayDetails: {},
        paymentStatus: {},
        paymentMethod: '',
        uploadOrderStatus: false,
        uploadOrderErrorMessage: '',
        orders: [],
        selectedOrder: {},
    }

    const [state, dispatch] = useReducer(OrderReducer, initialState)

    // const getAllProducts = async () => {
    //     setLoading()

    //     try {
    //         const res = await axios.get('/api/products');
    //         console.log('For all products',res.data);
    //         dispatch({
    //             type: GET_ALL_PRODUCTS,
    //             payload: res.data,  
    //         })
            
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    

    const setLoading = () => dispatch({type: SET_LOADING})

    const setTotal = (total) => {
        dispatch({
            type: SET_CART_TOTAL,
            payload: total
        })
    }

    const setAddress = (address, addressName,city, country, name, phoneNumber, postalCode)  =>{
        console.log(address);
        const add =  {
            address,
            addressName,
            city,
            country,
            name,
            phoneNumber,
            postalCode
        }
        dispatch({
            type: SET_ADDRESS,
            payload: add,
        })
    }

    const getRazorpayDetails = async () => {
        console.log(state.cartTotal);
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        const currency = "INR"
        const amount = state.cartTotal.totalPayable
        // console.log(amount);
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
          }
        const res = await axios.post('/api/order/razorpay', {amount,currency}, config);
        dispatch({
            type: GET_RAZORPAY_ORDER_ID,
            payload: res.data,
        })
    }

    const setPaymentStatus = (res) => {
        dispatch({
            type: SET_PAYMENT_STATUS,
            payload: res
        })
        dispatch({
            type: UPDATE_CART,
        })
    }

    const setPaymentMethod = (res) => {
        dispatch({
            type: SET_PAYMENT_METHOD,
            payload: res
        })
    }

    const createOrderHandler = async () => {
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        const order  = {}
        const ordered_items = []
        const cart = JSON.parse(localStorage.getItem('cartItems'))
        console.log(cart);
        cart.forEach(item => {
            const x = {}
            x.productName = item.productName
            x.quantity = item.quantity
            x.subCategory = item.subCategory
            x.image = item.images ? item.images[0].url :''
            x.price = item.discountedPrice
            x.HSN = item.HSN
            x.product = item._id
            ordered_items.push(x)
          });
          const price = state.cartTotal
          const paymentStatus={}
          paymentStatus.razorpay_payment_id= state.paymentStatus.razorpay_payment_id
          const address = state.deliveryAddress
          const paymentMethod= state.paymentMethod
          try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
              }
              console.log(config);
            const res = await axios.post('/api/order',{ ordered_items, price, paymentStatus, address, paymentMethod },config);
            console.log(res);
            dispatch({
                type: ADD_NEW_ORDER_SUCCESS,
                payload: res.data
            })
            
        } catch (error) {
            
            console.log(error.response.data);
            dispatch({
                type: ADD_NEW_ORDER_FAILED,
                payload:  error.response.data,  
            })
        }
    }
    const refreshUploadOrderStatus = () => {
        localStorage.removeItem("cartItems");
        dispatch({type: ADD_NEW_ORDER_REFRESH})
    }

    const getLoggedinUserOrders = async () => {
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        setLoading()
        console.log('imto');
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
              }
            const res = await axios.get('/api/order/myorders', config);
            console.log('For all products',res.data);
            dispatch({
                type: GET_ALL_ORDERS,
                payload: res.data,  
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const getSelectedOrder = async (id) => {
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        setLoading()
        console.log('into order');

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
              }
            const res = await axios.get(`/api/order/${id}`, config);
            dispatch({
                type: GET_SINGLE_ORDERS,
                payload: res.data,  
            })
            // offline
            // const res = await axios.get(`/offline/products/${id}`);
            // dispatch({
            //     type: GET_SINGLE_PRODUCTS,
            //     payload: res.data,  
            // })

        } catch (error) {
            console.log(error.message);
        }
    }

    const getadminOrders = async() => {
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        setLoading()
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
              }
            const res = await axios.get(`/api/order`,config);
            console.log(res.data);
            dispatch({
                type: GET_ALL_ORDERS,
                payload: res.data,  
            })
            
        } catch (error) {
            
            console.log(error.response);
            // dispatch({
            //     type: ADMIN_UPDATE_PRODUCT_ERROR_MESSAGE,
            //     payload:  errorMsg,  
            // })
        }
    }

    const deliverOrderHamdler = async(id) =>{
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        setLoading()
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
              }
              console.log(config);
            const res = await axios.put(`/api/order/${id}/deliver`,{},config);
            console.log(res.data);
            dispatch({
                type: SET_ORDER_TO_DELIVERED,
                payload: res.data,  
            })
            
        } catch (error) {
            
            console.log(error.response);
            // dispatch({
            //     type: ADMIN_UPDATE_PRODUCT_ERROR_MESSAGE,
            //     payload:  errorMsg,  
            // })
        }
    }

    return (
        <OrderContext.Provider value={{
            setTotal,
            setAddress,
            cart: state.cart,
            deliveryAddress: state.deliveryAddress,
            cartTotal: state.cartTotal,
            getRazorpayDetails,
            razorPayDetails: state.razorPayDetails,
            setPaymentStatus,
            paymentStatus: state.paymentStatus,
            setPaymentMethod,
            paymentMethod: state.paymentMethod,
            createOrderHandler,
            refreshUploadOrderStatus,
            uploadOrderErrorMessage: state.uploadOrderErrorMessage,
            uploadOrderStatus: state.uploadOrderStatus,
            getLoggedinUserOrders,
            orders: state.orders,
            selectedOrder: state.selectedOrder,
            getSelectedOrder,
            getadminOrders,
            deliverOrderHamdler,
        }}>
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState
