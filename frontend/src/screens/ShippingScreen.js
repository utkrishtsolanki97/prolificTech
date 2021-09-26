import React, { useContext, useState } from 'react'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import OrderContext from '../context/Orders/OrderContext'
import UserContext from '../context/Users/UserContext'

const ShippingScreen = ({ history }) => {
  const orderContext = useContext(OrderContext)
  const userContext = useContext(UserContext)
  const user = JSON.parse(atob(localStorage.getItem('userDetails')))

  const [newaddress, setnewAddress] = useState('')
  const [newcity, setnewCity] = useState('')
  const [newpostalCode, setnewPostalCode] = useState(0)
  const [newcountry, setnewCountry] = useState('')
  const [newphoneNumber, setnewPhoneNumber] = useState(0)
  const [newaddressName, setnewAddressName] = useState('')
  const [newname, setnewName] = useState('')

  console.log(newaddress, newaddressName,newcity, newcountry, newname, newphoneNumber, newpostalCode);

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
    
    const newAddress = {
      addressName: newaddressName,
      address: newaddress,
      city: newcity,
      postalCode: newpostalCode,
      country: newcountry,
      name: newname,
      phoneNumber: newphoneNumber
    }
    console.log(newAddress);
    const update = JSON.parse(atob(localStorage.getItem('userDetails')))
    console.log('Current addres',update);
    update.deliveryAddress = [...update.deliveryAddress, newAddress]
    userContext.updateUser(update)
    console.log(user.deliveryAddress[e.target.value]);
    // const { address, addressName,city, country, name, phoneNumber, postalCode } = user.deliveryAddress[e.target.value]
    // console.log(address);
    orderContext.setAddress(newaddress, newaddressName,newcity, newcountry, newname, newphoneNumber, newpostalCode)
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
      
        
      <div name='new-address'  />
      <h1>Add a New Address</h1>
      
        <Form onSubmit={submitNewAddressHandler}>
          
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
              type='text'
              placeholder='Enter name'
              value={newname}
              required
              onChange={(e) => setnewName(e.target.value)}
          ></Form.Control>
      </Form.Group>

      <Form.Group controlId='address'>
      <Form.Label>Address</Form.Label>
      <Form.Control
          type='text'
          placeholder='Enter address'
          value={newaddress}
          required
          onChange={(e) => setnewAddress(e.target.value)}
      ></Form.Control>
      </Form.Group>

      <Form.Group controlId='city'>
      <Form.Label>City</Form.Label>
      <Form.Control
          type='text'
          placeholder='Enter city'
          value={newcity}
          required
          onChange={(e) => setnewCity(e.target.value)}
      ></Form.Control>
      </Form.Group>

      <Form.Group controlId='postalCode'>
      <Form.Label>Postal Code</Form.Label>
      <Form.Control
          type='text'
          placeholder='Enter postal code'
          value={newpostalCode}
          required
          onChange={(e) => setnewPostalCode(e.target.value)}
      ></Form.Control>
      </Form.Group>

      <Form.Group controlId='country'>
      <Form.Label>Country</Form.Label>
      <Form.Control
          type='text'
          placeholder='Enter country'
          value={newcountry}
          required
          onChange={(e) => setnewCountry(e.target.value)}
      ></Form.Control>
      </Form.Group>

      <Form.Group controlId='phone'>
      <Form.Label>Mobile Number</Form.Label>
      <Form.Control
          type='number'
          placeholder='Enter Mobile Number'
          value={newphoneNumber}
          onChange={(e) => setnewPhoneNumber(e.target.value)}
      ></Form.Control>
      </Form.Group>

      <Form.Group controlId='addressType'>
      <Form.Label>Select Address Type</Form.Label>
          <Form.Control
              as='select'
              value={newaddressName}
              onChange={(e) => setnewAddressName(e.target.value)}
          >
              <option >
                  Select An addess type
              </option>
              <option key="home" value="home">
                  Home
              </option>
              <option key="office" value="office">
                  Office (9AM to 5PM)
              </option>
              <option key="other" value="other">
                  Other
              </option>
          </Form.Control>
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
