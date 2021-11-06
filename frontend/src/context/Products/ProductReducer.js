import {  ADD_NEW_PRODUCT_FAILED, ADD_NEW_PRODUCT_INTO_CART, ADD_NEW_PRODUCT_REFRESH, ADD_NEW_PRODUCT_SUCCESS, ADMIN_UPDATE_PRODUCT_ERROR_MESSAGE, ADMIN_UPDATE_PRODUCT_REFRESH, ADMIN_UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILED, DELETE_PRODUCT_SUCCESS, GET_ALL_BANNER, GET_ALL_PRODUCTS, GET_SINGLE_PRODUCTS, REMOVE_PRODUCT_FROM_CART, SET_DELETE_PRODUCT_REFRESH, SET_LOADING, UPDATE_BANNER_FAILED, UPDATE_BANNER_SUCCESS } from './type'

export default (state,action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return{
                ...state,
                products: action.payload,
                loading: false
            }
        case GET_ALL_BANNER:
            return{
                ...state,
                banner: action.payload,
                loading: false
            }
        case GET_SINGLE_PRODUCTS:
            return{
                ...state,
                product: action.payload,
                loading: false
            }
        case ADD_NEW_PRODUCT_INTO_CART:
            return{
                ...state,
                cart:  action.payload
            }
        case REMOVE_PRODUCT_FROM_CART:
            return{
                ...state,
                cart:  action.payload
            }
        case SET_LOADING:
            return{
                ...state,
                loading: true
            }
        case ADD_NEW_PRODUCT_REFRESH:
            return{
                ...state,
                uploadProductStatus: false,
                uploadProductErrorMessage: '',
                loading: false
            }
        
        case ADD_NEW_PRODUCT_SUCCESS:
            return{
                ...state,
                uploadProductStatus: true,
                loading: false,
                uploadedProduct: action.payload,
            }
        case ADD_NEW_PRODUCT_FAILED:
            console.log('into error',action.payload);
            return{
                ...state,
                loading: false,
                uploadProductErrorMessage: action.payload
            }

        case DELETE_PRODUCT_FAILED:
            return{
                ...state,
                loading: false,
                deleteProductErrorMessage: action.payload
            }
        case SET_DELETE_PRODUCT_REFRESH:
            return{
                ...state,
                deleteProductStatus: false,
                deleteProductErrorMessage: '',
                loading: false
            }
        
        case DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                deleteProductStatus: true,
                loading: false
            }
        case ADMIN_UPDATE_PRODUCT_REFRESH:
            return{
                ...state,
                adminupdateProductStatus: false,
                adminUpdateProductErrorMessage: '',
                loading: false
            }
        
        case ADMIN_UPDATE_PRODUCT_SUCCESS:
            return{
                ...state,
                adminupdateProductStatus: true,
                loading: false
            }
        case ADMIN_UPDATE_PRODUCT_ERROR_MESSAGE:
            console.log('into error',action.payload);
            return{
                ...state,
                loading: false,
                adminUpdateProductErrorMessage: action.payload
            }
        case UPDATE_BANNER_FAILED:
            console.log('into error',action.payload);
            return{
                ...state,
                loading: false,
                updateBannerErrorMessage: action.payload
            }
        case UPDATE_BANNER_SUCCESS:
            
            return{
                ...state,
                updateBannerStatus: true,
                loading: false
            }
        default:
            return state
    }
}