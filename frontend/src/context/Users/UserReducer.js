import { ADMIN_UPDATE_USER_ERROR_MESSAGE, ADMIN_UPDATE_USER_REFRESH, ADMIN_UPDATE_USER_SUCCESS, DELETE_USER_FAILED, DELETE_USER_SUCCESS, GET_USER_BY_ID, GET_USER_BY_ID_ERROR, LOGIN_USER, LOGIN_USER_FAILED, LOGOUT_USER, REFRESH_ERROR_MESSAGE, REGISTER_USER_FAILED, REGISTER_USER_SUCCESS, SET_DELETE_USER_REFRESH, SET_LOADING, SET_REGISTER_USER_REFRESH, SET_USER_LIST, SET_USER_LIST_ERROR, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS } from './types'

export default (state,action) => {
    switch (action.type) {
        
        case SET_LOADING:
            return{
                ...state,
                loading: true
            }
        
        
        case LOGIN_USER:
            return{
                ...state,
                loading: false,
                user: action.payload
            }
        case LOGOUT_USER:
            return{
                ...state,
                user: {}
            }
        case LOGIN_USER_FAILED:
            console.log('into error',action.payload);
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case REGISTER_USER_FAILED:
            console.log('into error',action.payload);
            return{
                ...state,
                loading: false,
                registerErrorMessage: action.payload
            }
        case SET_REGISTER_USER_REFRESH:
            return{
                ...state,
                registeredUserStatus: false,
                registerErrorMessage: '',
                loading: false
            }
        
        case REGISTER_USER_SUCCESS:
            return{
                ...state,
                registeredUserStatus: true,
                loading: false
            }
        case REFRESH_ERROR_MESSAGE:
            console.log('into error',action.payload);
            return{
                ...state,
                loading: false,
                registerErrorMessage: action.payload
            }
        case SET_USER_LIST_ERROR:
            console.log('into error',action.payload);
            return{
                ...state,
                loading: false,
                userListLoadError: action.payload
            }
        case SET_USER_LIST:
            console.log('into error',action.payload);
            return{
                ...state,
                loading: false,
                userList: action.payload
            }
        case DELETE_USER_FAILED:
            return{
                ...state,
                loading: false,
                deleteUserErrorMessage: action.payload
            }
        case SET_DELETE_USER_REFRESH:
            return{
                ...state,
                deleteUserStatus: false,
                deleteUserErrorMessage: '',
                loading: false
            }
        
        case DELETE_USER_SUCCESS:
            return{
                ...state,
                deleteUserStatus: true,
                loading: false
            }
        case GET_USER_BY_ID:
            return{
                ...state,
                userById: action.payload,
                loading: false
            }
        case GET_USER_BY_ID_ERROR:
            return{
                ...state,
                userByIdErrorMessage: action.payload,
                loading: false
            }
        case ADMIN_UPDATE_USER_REFRESH:
            return{
                ...state,
                adminupdateUserStatus: false,
                adminUpdateUserErrorMessage: '',
                loading: false
            }
        
        case ADMIN_UPDATE_USER_SUCCESS:
            return{
                ...state,
                adminupdateUserStatus: true,
                loading: false
            }
        case ADMIN_UPDATE_USER_ERROR_MESSAGE:
            console.log('into error',action.payload);
            return{
                ...state,
                loading: false,
                adminUpdateUserErrorMessage: action.payload
            }
        case UPDATE_USER_FAILED:
            console.log('into error',action.payload);
            return{
                ...state,
                loading: false,
                updateUserErrorMessage: action.payload
            }
        case UPDATE_USER_SUCCESS:
            
            return{
                ...state,
                updateUserStatus: true,
                loading: false
            }
        default:
            return state
    }
}