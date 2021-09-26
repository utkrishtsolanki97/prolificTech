import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row,Button, Form, Spinner, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../Components/FormContainer'
import UserContext from '../context/Users/UserContext'
import "./ProfileScreen.scss"

const ProfileScreen = ({history}) => {
    const userContext = useContext(UserContext)
    useEffect(() => {
        const userInfo = localStorage.getItem('userDetails') && JSON.parse(atob(localStorage.getItem('userDetails')))
        if (userInfo) {
          
        } else {
          history.push('/login')
        }
        // eslint-disable-next-line
      },[history])
    useEffect(()=>{
        if (userContext.updateUserStatus && addressUpdate) {
            const x = JSON.parse(atob(localStorage.getItem('userDetails')))
            setAddress('')
            setCity('')
            setPostalCode(0)
            setPhoneNumber(0)
            setCountry('')
            setName(x.name)
            setAddressName('')
            setUserDetails(JSON.parse(atob(localStorage.getItem('userDetails'))))
            setAddressUpdate(false)
        }
        
    },[userContext.updateUserStatus])

    const [addressUpdate, setAddressUpdate] = useState(false)
    const [mainScreen, setMainScreen] = useState(true)
    const [addresses, setAddresses] = useState(false)
    const [addAddress, setAddAddress] = useState(false)
    const [userDetails, setUserDetails] = useState(localStorage.getItem('userDetails') ? JSON.parse(atob(localStorage.getItem('userDetails'))) : {})
    console.log(userDetails);
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState(0)
    const [country, setCountry] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [addressName, setAddressName] = useState('')
    const [name, setName] = useState(userDetails.name)
    const [email, setEmail] = useState(userDetails.email)
    const [password, setPassword] = useState(userDetails.password)
    const [gender, setGender] = useState(userDetails.gender)
    const [phone, setPhone] = useState(userDetails.phoneNumber)
    // console.log(userDetails);
    const addAddressHandler = (e) => {
        e.preventDefault()
        
        const newAddress = {
            addressName,
            address,
            city,
            postalCode,
            country,
            name,
            phoneNumber
        }
        const update = JSON.parse(atob(localStorage.getItem('userDetails')))
        console.log('Current addres',update);
        update.deliveryAddress = [...update.deliveryAddress, newAddress]
        userContext.updateUser(update)
        console.log('Updated addres',update);
        setAddressUpdate(true)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        const user = {
            name,
            email,
            gender,
            phoneNumber: phone,
            password
        }
        userContext.updateUser(user)
        // userContext.userRegister(name,phone,gender,email,password)
      }
    const deleteAddressHandler = (e) => {
        e.preventDefault();
        const index = e.target.value
        console.log(e.target.value);
        const update = JSON.parse(atob(localStorage.getItem('userDetails')))
        console.log(update);
        let tempAddress = update.deliveryAddress
        console.log(tempAddress);
        update.deliveryAddress.splice(index,1)
        console.log(tempAddress);
        userContext.updateUser(update)
        setUserDetails(update)
    }
    return (
        <div className="profileScreen">
            
            {
                mainScreen ? (
                    <div className="mainScreen">
                        <div className="mAccountHeaading">
                            <h2>My Account</h2>
                            <hr />
                        </div>
                        <br />
                        <br />
                        <br />
                        <Row>
                            <Col sm='3' xs='12' onClick={e => {setMainScreen(false)}} >
                                <Link to='/myOrders'>
                                    <h4>My Orders <i class="fas fa-chevron-right"></i></h4>
                                    <p>View, modify, and track orders</p>
                                </Link>
                            </Col>
                            <Col sm='3' xs='12' onClick={e => {setAddresses(true); setMainScreen(false)}}>
                                <h4>My Addresses <i class="fas fa-chevron-right"></i></h4>
                                <p>View, modify, and track addresses</p>
                            </Col>
                            <Col sm='3' xs='12' onClick={e => {setMainScreen(false)}}>
                                <h4>My Profile <i class="fas fa-chevron-right"></i></h4>
                                <p>Edit personel info, change password</p>
                            </Col>
                        </Row>
                    </div>
                )  : addresses ? (
                    <div className="addressesScreen">
                        
                        <div className='btn btn-light my-3' onClick={e => {setAddresses(false); setMainScreen(true)}} >
                            Go Back
                        </div>
                        <br />
                        <div className="mAccountHeaading">
                            <h2>My Addresses</h2>
                            <hr />
                        </div>
                        <br/><br/><br/>
                        <Row >
                            {
                                userDetails.deliveryAddress.map((address,index)=>(
                                <Col key={index} sm={12} md={4}>
                                    <Card className='my-3 p-3 rounded'>
                                        <h6><b>{address.name}</b></h6>
                                        <p>{address.address +', '+ address.city +', '+ address.country +', '+ address.postalCode}</p>
                                        <p><b>Mob:</b> {address.phoneNumber}</p>
                                        {/* <Button key={index} value={index} >Deliver to this address</Button> */}
                                        <Row>
                                            <Col sm={6} md={6}><Button style={{width:'100%'}} value={index} variant="outline-secondary">Edit</Button></Col>
                                            <Col sm={6} md={6}><Button style={{width:'100%'}} value={index} onClick={deleteAddressHandler} variant="outline-secondary">Delete</Button></Col>
                                        </Row>
                                    </Card>
                                </Col>
                                ))
                            }
                            <Col key='7' sm={12} md={4}>
                                <Card className='my-3 p-3 rounded'>
                                    <div className="newAddressCard" onClick={e=> setAddAddress(true)} >
                                        <span style={{fontSize: "50px", lineHeight:"0px"}}>+</span>
                                        <br />
                                        ADD NEW ADDRESS
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        { addAddress && <Row>
                            <FormContainer>
                            <h1>Add a New Address</h1>
                            {userContext.loading && <Spinner />}
                            {userContext.updateUserStatus && <Alert variant='Success' >Updated User Content</Alert>}
                            {userContext.updateUserErrorMessage && <Alert variant='danger'>{userContext.updateUserErrorMessage}</Alert>}
                            <Form>
                                
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter name'
                                        value={name}
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

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

                                <Form.Group controlId='addressType'>
                                <Form.Label>Select Address Type</Form.Label>
                                    <Form.Control
                                        as='select'
                                        value={addressName}
                                        onChange={(e) => setAddressName(e.target.value)}
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

                                <Button type='submit' variant='primary' onClick={addAddressHandler}>
                                    Continue
                                </Button>
                            </Form>
                            </FormContainer>
                        </Row>}
                    </div>
                ) : (
                    <div>
                        
                        <br/>
                        <div className='btn btn-light my-3' onClick={e => {setMainScreen(true)}} >
                            Go Back
                        </div>
                        <br />
                        <div className="mAccountHeaading">
                            <h2>My Profile</h2>
                            <hr />
                        </div>
                        <br/><br/><br/>
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
                                <Form.Select placeholder='Select Gender' value={gender} onChange={e => setGender(e.target.value)} >
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
                    
                    
                            <Button type='submit' variant='primary'>
                                Register
                            </Button>
                        </Form>
                    </div>
                )
            }
        </div>
    )
}

export default ProfileScreen
