import React, { useContext, useState } from 'react'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import OrderContext from '../context/Orders/OrderContext'

const ShippingScreen = ({ history }) => {
  const orderContext = useContext(OrderContext)
  // const cart = useSelector((state) => state.cart)
  // const { shippingAddress } = cart
  const user = JSON.parse(atob(localStorage.getItem('userDetails')))

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState(0)
  const [country, setCountry] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [addressName, setAddressName] = useState('')
  const [name, setName] = useState('')

  // const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(user.deliveryAddress[e.target.value]);
    const { address, addressName,city, country, name, phoneNumber, postalCode } = user.deliveryAddress[e.target.value]
    console.log(address);
    orderContext.setAddress(address, addressName,city, country, name, phoneNumber, postalCode)
    // dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }
  const submitNewAddressHandler = (e) => {
    e.preventDefault()
    
    console.log(address);
    orderContext.setAddress(address, addressName,city, country, name, phoneNumber, postalCode)
    // dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }
  console.log(orderContext.deliveryAddress);
  return (
    <div>
      <FormContainer>
        <CheckoutSteps step1 step2 />
      
      <div>
        <h2>Please Select a Shipping Address</h2>
        <p>Is the address you'd like to use displayed below? If so, click the corresponding "Deliver to this address" button. Or you can <a href='#new-address'>enter a new delivery address.</a> </p>
        <Row >
          {
            (user && user.deliveryAddress &&  user.deliveryAddress.length>0) ? user.deliveryAddress.map((address,index)=>(
              <Col key={index} sm={12} md={6}>
                <Card className='my-3 p-3 rounded'>
                  <h6><b>{address.name}</b></h6>
                  <p>{address.address +', '+ address.city +', '+ address.country +', '+ address.postalCode}</p>
                  <p><b>Mob:</b> {address.phoneNumber}</p>
                  <Button key={index} value={index} onClick={submitHandler}>Deliver to this address</Button>
                  <Row>
                    <Col sm={6} md={6}><Button style={{width:'100%'}}  variant="outline-secondary">Edit</Button></Col>
                    <Col sm={6} md={6}><Button style={{width:'100%'}}  variant="outline-secondary">Delete</Button></Col>
                  </Row>
                </Card>
              </Col>
            )) : <h6>Please Add new Address</h6>
          }
            
        </Row>
      </div>
      
        
      <a name='new-address' />
      <h1>Add a New Address</h1>
      
        <Form onSubmit={submitHandler}>
          
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter postal code'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter country'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='phone'>
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter Mobile Number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  )
}

export default ShippingScreen
