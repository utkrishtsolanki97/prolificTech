import {  ADD_NEW_ORDER_FAILED, ADD_NEW_ORDER_REFRESH, ADD_NEW_ORDER_SUCCESS, GET_ALL_ORDERS, GET_RAZORPAY_ORDER_ID, GET_SINGLE_ORDERS, SET_ADDRESS, SET_CART_TOTAL, SET_LOADING, SET_PAYMENT_METHOD, SET_PAYMENT_STATUS, UPDATE_CART } from './type'

export default (state,action) => {
    switch (action.type) {
        
        case SET_LOADING:
            return{
                ...state,
                loading: true
            }
        case SET_ADDRESS:
            console.log(action.payload);
            return{
                ...state,
                deliveryAddress: action.payload,
            }
        case SET_CART_TOTAL:
            console.log(action.payload);
            return{
                ...state,
                cartTotal: action.payload,
            }
        case GET_RAZORPAY_ORDER_ID:
            console.log(action.payload);
            return{
                ...state,
                razorPayDetails: action.payload,
            }
        case SET_PAYMENT_STATUS:
            console.log(action.payload);
            return{
                ...state,
                paymentStatus: action.payload,
            }
        case SET_PAYMENT_METHOD:
            console.log(action.payload);
            return{
                ...state,
                paymentMethod: action.payload,
            }
        case ADD_NEW_ORDER_REFRESH:
            return{
                ...state,
                uploadOrderStatus: false,
                uploadOrderErrorMessage: '',
                loading: false
            }
        
        case ADD_NEW_ORDER_SUCCESS:
            return{
                ...state,
                uploadOrderStatus: true,
                loading: false,
                uploadedOrder: action.payload,
            }
        case ADD_NEW_ORDER_FAILED:
            console.log('into error',action.payload);
            return{
                ...state,
                loading: false,
                uploadOrderErrorMessage: action.payload
            }
        case GET_ALL_ORDERS:
            console.log('into error',action.payload);
            return{
                ...state,
                orders: action.payload
            }
        case GET_SINGLE_ORDERS:
            console.log('into error',action.payload);
            return{
                ...state,
                selectedOrder: action.payload,
                loading: false
            }
        case UPDATE_CART:
            return{
                ...state,
                cart: JSON.parse(localStorage.getItem('cartItems')),
            }
    
        default:
            return state
    }
}