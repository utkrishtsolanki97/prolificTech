import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import UserContext from '../context/Users/UserContext'

const UserEditScreen = ({ match, history }) => {
  useEffect(() => {
    const userInfo = localStorage.getItem('userDetails') && JSON.parse(atob(localStorage.getItem('userDetails')))
    if (userInfo && userInfo.isAdmin) {
      
    } else {
      history.push('/login')
    }
  })
  const userContext = useContext(UserContext)
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(()=>{
    userContext.getUserById(userId)
  },[history])
  useEffect(()=>{
    if(userContext.adminupdateUserStatus){
      userContext.refreshAdminUpdateErrorMesssage()
      history.push('/admin/userlist')
    }
    else{
      console.log(userContext.userById);
      setName(userContext.userById.name)
      setEmail(userContext.userById.email)
      setPhone(userContext.userById.phoneNumber)
      setIsAdmin(userContext.userById.isAdmin)
    }
  },[userContext.userById, userContext.adminupdateUserStatus])

  

  // useEffect(() => {
  //   if (successUpdate) {
  //     dispatch({ type: USER_UPDATE_RESET })
  //     history.push('/admin/userlist')
  //   } else {
  //     if (!user.name || user._id !== userId) {
  //       dispatch(getUserDetails(userId))
  //     } else {
  //       setName(user.name)
  //       setEmail(user.email)
  //       setIsAdmin(user.isAdmin)
  //     }
  //   }
  // }, [dispatch, history, userId, user, successUpdate])

  // refreshAdminUpdateErrorMesssage,
  //           adminupdateUser,
  //           adminUpdateUserErrorMessage: state.adminUpdateUserErrorMessage,
  //           adminupdateUserStatus: state.adminupdateUserStatus,

  const submitHandler = (e) => {
    e.preventDefault()
    userContext.adminupdateUser(userId,name,email,phone,isAdmin)
    // dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
         
         {/* Update user  */}
        {userContext.loading && <Spinner animation="border" />}
        {userContext.adminUpdateUserErrorMessage && <Alert variant='danger'>{userContext.adminUpdateUserErrorMessage}</Alert>}
        {userContext.loading ? (
            <Spinner animation="border" />
          ) : userContext.userByIdErrorMessage ? (
            <Alert variant='danger'>{userContext.userByIdErrorMessage}</Alert>
          ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='phone'>
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Mobile Number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='switch'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
