import axios from 'axios'
import React, { useReducer } from 'react'
import productContext from './productContext'
import ProductReducer from './ProductReducer'
import { ADD_INTO_EXISTING, ADD_NEW_PRODUCT_FAILED, ADD_NEW_PRODUCT_INTO_CART, ADD_NEW_PRODUCT_REFRESH, ADD_NEW_PRODUCT_SUCCESS, ADMIN_UPDATE_PRODUCT_ERROR_MESSAGE, ADMIN_UPDATE_PRODUCT_REFRESH, ADMIN_UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILED, DELETE_PRODUCT_SUCCESS, GET_ALL_BANNER, GET_ALL_PRODUCTS, GET_SINGLE_PRODUCTS, REMOVE_PRODUCT_FROM_CART, SET_DELETE_PRODUCT_REFRESH, SET_LOADING } from './type'

const ProductState = (props) => {

    const initialState = {
        products: [],
        banner: [],
        loading: false,
        product: {},
        cart: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        uploadProductStatus: false,
        uploadProductErrorMessage: '',
        uploadedProduct: {},
        updateProductStatus: false,
        deleteProductErrorMessage: '',
        deleteProductStatus: false,
        adminUpdateProductErrorMessage: '',
        adminupdateProductStatus: false,
    }

    const [state, dispatch] = useReducer(ProductReducer, initialState)

    const getAllProducts = async () => {
        setLoading()

        try {
            const res = await axios.get('/api/products');
            console.log('For all products',res.data);
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: res.data,  
            })
            //offline
            // const res = await axios.get('/offline/products');
            // console.log('For all products',res);
            // dispatch({
            //     type: GET_ALL_PRODUCTS,
            //     payload: res.data,  
            // })
        } catch (error) {
            console.log(error.message);
        }
    }
    const getBanners = async () => {
        setLoading()

        try {
            const res = await axios.get('/api/banner');
            console.log('For all products',res.data);
            dispatch({
                type: GET_ALL_BANNER,
                payload: res.data,  
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const getProduct = async (id) => {
        setLoading()

        try {
            const res = await axios.get(`/api/products/${id}`);
            dispatch({
                type: GET_SINGLE_PRODUCTS,
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

    const addProductToCart = async (productId, qty) => {
            const res = await axios.get(`/api/products/${productId}`);
            const product =res.data
            product.quantity = qty
            // offline
            // const res = await axios.get(`/offline/products/${productId}`);
            // const product =res.data
            // product.quantity = qty
            const existItem = state.cart.find(item => item._id == productId)
            let updateCart = []
            if(existItem){
                updateCart = state.cart.map(item => item._id == productId? product : item)
                dispatch({
                    type: ADD_NEW_PRODUCT_INTO_CART,
                    payload: updateCart,  
                })
            }
            else{
                updateCart = [...state.cart, product]
                dispatch({
                    type: ADD_NEW_PRODUCT_INTO_CART,
                    payload: updateCart
                })
            }
            localStorage.setItem('cartItems',JSON.stringify(updateCart))
    }

    const removeProductFromCart = (id) => {
        const updateCart = state.cart.filter(x => x._id !== id)
        dispatch({
            type: REMOVE_PRODUCT_FROM_CART,
            payload: updateCart
        })
        localStorage.setItem('cartItems',JSON.stringify(updateCart))
    }

    const uploadProduct = async (productName,subCategory,description,HSN,actualPrice,discountedPrice,images,stock,return_type) => {
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        setLoading()
        
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
              }
              console.log(config);
            const res = await axios.post('/api/products/',{ productName,subCategory,description,HSN,actualPrice,discountedPrice,images,stock,return_type },config);
            console.log(res);
            dispatch({
                type: ADD_NEW_PRODUCT_SUCCESS,
                payload: res.data
            })
            
        } catch (error) {
            
            console.log(error.response.data);
            dispatch({
                type: ADD_NEW_PRODUCT_FAILED,
                payload:  error.response.data,  
            })
        }
    }

    const refreshUploadProductStatus = () => dispatch({type: ADD_NEW_PRODUCT_REFRESH})

    const deleteProduct = async (id) => {
        setLoading()
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`
                },
              }
            const res = await axios.delete(`/api/products/${id}`,config);
            console.log(res);
            dispatch({
                type: DELETE_PRODUCT_SUCCESS
            })
            
        } catch (error) {
            
            console.log(error.response.data);
            dispatch({
                type: DELETE_PRODUCT_FAILED,
                payload:  error.response.data,  
            })
        }
    }

    const refreshDeleteErrorMesssage = () => dispatch({type: SET_DELETE_PRODUCT_REFRESH})

    const adminupdateProduct = async (productId,productName,subCategory,description,HSN,actualPrice,discountedPrice,images,stock,return_type) => {
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        setLoading()
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
              }
            const res = await axios.put(`/api/products/${productId}`,{productId, productName,subCategory,description,HSN,actualPrice,discountedPrice,images,stock,return_type },config);
            console.log(res);
            dispatch({
                type: ADMIN_UPDATE_PRODUCT_SUCCESS
            })
            
        } catch (error) {
            
            console.log(error.response);
            const errorMsg = error.response.status === 500 ? 'This Email Id Already Taken' : error.response.data
            console.log(errorMsg);
            dispatch({
                type: ADMIN_UPDATE_PRODUCT_ERROR_MESSAGE,
                payload:  errorMsg,  
            })
        }
    }

    const refreshAdminUpdateErrorMesssage = () => dispatch({type: ADMIN_UPDATE_PRODUCT_REFRESH})

    const setLoading = () => dispatch({type: SET_LOADING})

    return (
        <productContext.Provider value={{
            getAllProducts,
            getBanners,
            getProduct,
            loading: state.loading,
            allproducts: state.products,
            banner: state.banner,
            product: state.product,
            addProductToCart,
            removeProductFromCart,
            cart: state.cart,
            uploadProduct,
            uploadProductErrorMessage: state.uploadProductErrorMessage,
            uploadedProduct: state.uploadedProduct,
            uploadProductStatus:state.uploadProductStatus,
            refreshUploadProductStatus,
            updateProductStatus: state.updateProductStatus,
            deleteProduct,
            deleteProductErrorMessage: state.deleteProductErrorMessage,
            deleteProductStatus: state.deleteProductStatus,
            refreshDeleteErrorMesssage,
            refreshAdminUpdateErrorMesssage,
            adminupdateProduct,
            adminUpdateProductErrorMessage: state.adminUpdateProductErrorMessage,
            adminupdateProductStatus: state.adminupdateProductStatus,
        }}>
            {props.children}
        </productContext.Provider>
    )
}

export default ProductState
