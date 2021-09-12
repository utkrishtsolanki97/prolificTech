import axios from 'axios'
import React, { useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import { ADMIN_UPDATE_USER_ERROR_MESSAGE, ADMIN_UPDATE_USER_REFRESH, ADMIN_UPDATE_USER_SUCCESS, DELETE_USER_FAILED, DELETE_USER_SUCCESS, GET_USER_BY_ID, LOGIN_USER, LOGIN_USER_FAILED, LOGOUT_USER, REFRESH_ERROR_MESSAGE, REGISTER_USER_FAILED, REGISTER_USER_SUCCESS, SET_DELETE_USER_REFRESH, SET_LOADING, SET_REGISTER_USER_REFRESH, SET_USER_LIST, SET_USER_LIST_ERROR } from './types'

const UserState = (props) => {

    const initialState = {
        
        loading: false,
        user: localStorage.getItem('userDetails') ? localStorage.getItem('userDetails') : {},
        error: '',
        registerErrorMessage: '',
        registeredUserStatus: false,
        userList: [],
        userListLoadError: '',
        deleteUserErrorMessage: '',
        deleteUserStatus: false,
        userById: {},
        userByIdErrorMessage: '',
        adminupdateUserStatus: false,
        adminUpdateUserErrorMessage: ''
    }

    // to access user details use
    // JSON.parse(atob(localStorage.getItem('userDetails')))

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const userLogin = async (email,password) => {
        setLoading()
        let user = null
        try {
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            const res = await axios.post('/api/users/login',{ email, password },config);
            console.log(res);
            user = res.data
            dispatch({
                type: LOGIN_USER,
                payload: res.data,  
            })

        } catch (error) {
            
            console.log(error.response.data);
            dispatch({
                type: LOGIN_USER_FAILED,
                payload:  error.response.data,  
            })
        }
        console.log(user);
        user && localStorage.setItem('userDetails',btoa(JSON.stringify(user)))
    }

    const userRegister = async (name,phoneNumber,gender,email,password) => {
        setLoading()
        try {
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            const res = await axios.post('/api/users/',{ name, email, password, phoneNumber, gender },config);
            console.log(res);
            dispatch({
                type: REGISTER_USER_SUCCESS
            })
            
        } catch (error) {
            
            console.log(error.response.data);
            dispatch({
                type: REGISTER_USER_FAILED,
                payload:  error.response.data,  
            })
        }
    }

    const listAllUsers = async () => {
        setLoading()
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`
                },
              }
            const res = await axios.get('/api/users/',config);
            console.log(res);
            dispatch({
                type: SET_USER_LIST,
                payload: res.data
            })
            
        } catch (error) {
            
            console.log(error.response.data);
            dispatch({
                type: SET_USER_LIST_ERROR,
                payload:  error.response.data,  
            })
        }
    }

    const deleteUser = async (id) => {
        setLoading()
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`
                },
              }
            const res = await axios.delete(`/api/users/${id}`,config);
            console.log(res);
            dispatch({
                type: DELETE_USER_SUCCESS
            })
            
        } catch (error) {
            
            console.log(error.response.data);
            dispatch({
                type: DELETE_USER_FAILED,
                payload:  error.response.data,  
            })
        }
    }

    const getUserById = async (id) => {
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        setLoading()
        try {
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`
                },
              }
            const res = await axios.get(`/api/users/${id}`,config);
            console.log(res);
            dispatch({
                type: GET_USER_BY_ID,
                payload: res.data
            })
            
        } catch (error) {
            
            console.log(error.response.data);
        }
    }

    const adminupdateUser = async (userId,name,email,phoneNumber,isAdmin) => {
        const user = JSON.parse(atob(localStorage.getItem('userDetails')))
        setLoading()
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
              }
            const res = await axios.put(`/api/users/${userId}`,{ name, email, phoneNumber, isAdmin },config);
            console.log(res);
            dispatch({
                type: ADMIN_UPDATE_USER_SUCCESS
            })
            
        } catch (error) {
            
            console.log(error.response);
            const errorMsg = error.response.status === 500 ? 'This Email Id Already Taken' : error.response.data
            console.log(errorMsg);
            dispatch({
                type: ADMIN_UPDATE_USER_ERROR_MESSAGE,
                payload:  errorMsg,  
            })
        }
    }

    const setLoading = () => dispatch({type: SET_LOADING})

    const refreshRegisteredUser = () => dispatch({type: SET_REGISTER_USER_REFRESH})

    const refreshErrorMesssage = () => dispatch({type: REFRESH_ERROR_MESSAGE})

    const refreshDeleteErrorMesssage = () => dispatch({type: SET_DELETE_USER_REFRESH})

    const refreshAdminUpdateErrorMesssage = () => dispatch({type: ADMIN_UPDATE_USER_REFRESH})

    const logoutUser = () => {
        localStorage.removeItem("userDetails")
        dispatch({type: LOGOUT_USER})
    }

    return (
        <UserContext.Provider value={{
            user: state.user,
            loading: state.loading,
            userLogin,
            error: state.error,
            logoutUser,
            userRegister,
            refreshRegisteredUser,
            registeredUserStatus : state.registeredUserStatus,
            registerErrorMessage: state.registerErrorMessage,
            refreshErrorMesssage,
            userList: state.userList,
            listAllUsers,
            deleteUser,
            deleteUserErrorMessage: state.deleteUserErrorMessage,
            deleteUserStatus: state.deleteUserStatus,
            refreshDeleteErrorMesssage,
            getUserById,
            userById: state.userById,
            userByIdErrorMessage: state.userByIdErrorMessage,
            refreshAdminUpdateErrorMesssage,
            adminupdateUser,
            adminUpdateUserErrorMessage: state.adminUpdateUserErrorMessage,
            adminupdateUserStatus: state.adminupdateUserStatus,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
