import axios from 'axios'
import React, { useReducer } from 'react'
import CouponContext from './CouponContext'
import CouponReducer from './CouponReducer'
import {   GET_ALL_COUPONS_FAILED, GET_ALL_COUPONS_SUCCESS, GET_COUPON_STATUS_FAILED, GET_COUPON_STATUS_SUCCESS, SET_DELETE_COUPON_FAILED, SET_LOADING, SET_NEW_COUPON_FAILED, SET_NEW_COUPON_SUCCESS } from './type'

const CouponState = (props) => {

    const initialState = {
        loading: false,
        couponList: [],
        couponErrorMessage: '',
        couponAddErrorMessage: '',
        couponDeleteErrorMessage: '',
        couponDetails: [],
        couponCodeError: '',
    }

    const [state, dispatch] = useReducer(CouponReducer, initialState)

    const getAllCoupons = async () => {
        setLoading()
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        console.log(user);
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
          }
        try {
            const res = await axios.get('/api/coupon/getall',config);
            console.log(res.data);
            console.log('For all products',res.data);
            dispatch({
                type: GET_ALL_COUPONS_SUCCESS,
                payload: res.data,  
            })
            
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: GET_ALL_COUPONS_FAILED,
                payload: error.message,  
            })
        }
    }

    const createCoupon = async (coupon) =>{
        setLoading()
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
          }
        try {
            const res = await axios.post('/api/coupon',coupon,config);
            console.log(res.data);
            console.log('For all products',res.data);
            dispatch({
                type: SET_NEW_COUPON_SUCCESS,
                payload: res.data,  
            })
            getAllCoupons()
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: SET_NEW_COUPON_FAILED,
                payload: error.message,  
            })
        }
    }

    const deleteCoupon = async (coupon) =>{
        setLoading()
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
          }
        try {
            const res = await axios.delete(`/api/coupon?coupon=${coupon}`,config);
            console.log(res.data);
            console.log('For all products',res.data);
            dispatch({
                type: SET_NEW_COUPON_SUCCESS,         
                payload: res.data,  
            })
            getAllCoupons()
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: SET_DELETE_COUPON_FAILED,
                payload: error.message,  
            })
        }
    }

    const checkCoupon = async (coupon) =>{
        setLoading()
        
        try {
            const res = await axios.get(`/api/coupon?coupon=${coupon}`);
            console.log(res.data);
            console.log('For all products',res.data);
            dispatch({
                type: GET_COUPON_STATUS_SUCCESS,         
                payload: res.data,  
            })
            getAllCoupons()
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: GET_COUPON_STATUS_FAILED,
                payload: error.message,  
            })
        }
    }

    

    const setLoading = () => dispatch({type: SET_LOADING})

    

    return (
        <CouponContext.Provider value={{
            loading: state.loading,
            getAllCoupons,
            couponList: state.couponList,
            couponErrorMessage: state.couponErrorMessage,
            createCoupon,
            couponAddErrorMessage: state.couponAddErrorMessage,
            deleteCoupon,
            checkCoupon,
            couponDetails: state.couponDetails,
            couponCodeError: state.couponCodeError
        }}>
            {props.children}
        </CouponContext.Provider>
    )
}

export default CouponState
