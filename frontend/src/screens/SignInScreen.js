import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../Components/FormContainer'
import UserContext from '../context/Users/UserContext'

const SignInScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const userContext = useContext(UserContext)
    // const dispatch = useDispatch()
  
    // const userLogin = useSelector((state) => state.userLogin)
    // const { loading, error, userInfo } = userLogin
  
    const redirect = location.search ? location.search.split('=')[1] : '/'
  
    useEffect(() => {
        console.log('user into system', userContext.user);
        console.log('error',userContext.error);
      }, [userContext.user,userContext.error])

    useEffect(() => {
      if(localStorage.getItem('userDetails') && JSON.parse(atob(localStorage.getItem('userDetails')))){
        history.push(redirect)
      }
    }, [history, userContext.user, redirect])
  
    const submitHandler = (e) => {
      e.preventDefault()
      userContext.userLogin(email,password)
    //   dispatch(login(email, password))
    }
  
    return (
      <FormContainer>
        <h1>Sign In</h1>
        {userContext.error && <Alert variant='danger'>{userContext.error}</Alert>}
        {userContext.loading && <Spinner animation="border" />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>
  
        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    )
  }

export default SignInScreen
