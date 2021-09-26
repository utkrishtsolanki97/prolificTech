import {  GET_ALL_COUPONS_FAILED, GET_ALL_COUPONS_SUCCESS, GET_COUPON_STATUS_FAILED, GET_COUPON_STATUS_SUCCESS, SET_LOADING, SET_NEW_COUPON_FAILED, SET_NEW_COUPON_SUCCESS } from './type'

export default (state,action) => {
    switch (action.type) {
        
        case SET_LOADING:
            return{
                ...state,
                loading: true
            }
        case GET_ALL_COUPONS_SUCCESS:
            return{
                ...state,
                loading: false,
                couponList: action.payload
            }
        case GET_ALL_COUPONS_FAILED:
            return{
                ...state,
                loading: false,
                couponErrorMessage: action.payload
            }
        case SET_NEW_COUPON_FAILED:
            return{
                ...state,
                loading: false,
                couponDeleteErrorMessage: action.payload
            }
        case GET_COUPON_STATUS_SUCCESS:
            return{
                ...state,
                loading: false,
                couponDetails: action.payload
            }
        case GET_COUPON_STATUS_FAILED:
            return{
                ...state,
                loading: false,
                couponCodeError: action.payload
            }
        default:
            return state
    }
}