import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../Components/FormContainer'
import UserContext from '../context/Users/UserContext'

const SignupScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState(null)

    const userContext = useContext(UserContext)
  
    // const dispatch = useDispatch()
  
    // const userRegister = useSelector((state) => state.userRegister)
    // const { loading, error, userInfo } = userRegister
  
    // const redirect = location.search ? location.search.split('=')[1] : '/'
  
    // useEffect(() => {
    //   if (userInfo) {
    //     history.push(redirect)
    //   }
    // }, [history, userInfo, redirect])
  
    const submitHandler = (e) => {
      e.preventDefault()
      setMessage(null)
      if(userContext.registerErrorMessage.length>2){
        userContext.refreshErrorMesssage()
      }
      if (password !== confirmPassword) {
        setMessage('Passwords do not match')
      } else {
        userContext.userRegister(name,phone,gender,email,password)
        
      }
    }

    useEffect(()=>{
      console.log(email.length);
      console.log(userContext.registeredUserStatus);
      if (email.length>7 && userContext.registeredUserStatus) {
        console.log('into refresh');
        userContext.refreshRegisteredUser()
        history.push('/login')
      }
       // eslint-disable-next-line
    },[userContext.registeredUserStatus])
  
    return (
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Alert variant='danger'>{message}</Alert>}
        {userContext.registerErrorMessage && <Alert variant='danger'>{userContext.registerErrorMessage}</Alert>}
        {/* {loading && <Loader />} */}
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

          <Form.Group controlId='phone'>
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Mobile Number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

          <Form.Group controlId='gender'>
            <Form.Label>Gender</Form.Label>
            <Form.Select placeholder='Select Gender' onChange={e => setGender(e.target.value)} >
                <option value='select'>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </Form.Select>
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
  
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Button type='submit' variant='primary'>
            Register
          </Button>
        </Form>
  
        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to= '/login'>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    )
  }

export default SignupScreen
