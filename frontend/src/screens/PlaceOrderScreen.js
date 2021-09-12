import React, { useContext, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import CheckoutSteps from '../Components/CheckoutSteps'
import OrderContext from '../context/Orders/OrderContext'
import errorImage from '../assets/error-image-generic.png'

const PlaceOrderScreen = ({ history }) => {
  // const dispatch = useDispatch()

  // const cart = useSelector((state) => state.cart)
  const orderContext = useContext(OrderContext)
  const Message= ''

  if (!orderContext.deliveryAddress) {
    history.push('/shipping')
  } else if (!orderContext.paymentStatus) {
    history.push('/payment')
  }
  // const {cart, deliveryAddress, cartTotal, paymentStatus} = orderContext
  const cart = orderContext.cart || JSON.parse(localStorage.getItem('cartItems'))
  const deliveryAddress = orderContext.deliveryAddress
  const PriceDetails = orderContext.cartTotal
  const paymentStatus = orderContext.paymentStatus
  console.log(cart, deliveryAddress,PriceDetails, paymentStatus);
  
  // const orderCreate = useSelector((state) => state.orderCreate)
  // const { order, success, error } = orderCreate

  // useEffect(() => {
  //   if (success) {
  //     history.push(`/order/${order._id}`)
  //     dispatch({ type: USER_DETAILS_RESET })
  //     dispatch({ type: ORDER_CREATE_RESET })
  //   }
  //   eslint-disable-next-line
  // }, [history, success])

  useEffect(()=>{
    if (orderContext.uploadOrderStatus) {
      orderContext.refreshUploadOrderStatus()
      history.push('/')
    }
  })

  const placeOrderHandler = () => {
    orderContext.createOrderHandler()
  }


  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong>{deliveryAddress.name}</p>
              <p>
                <strong>Address: </strong>
                {deliveryAddress.address}, {deliveryAddress.city}{' '}
                {deliveryAddress.postalCode},{' '}
                {deliveryAddress.country}
              </p>
              <p><strong>Mobile: </strong>{deliveryAddress.phoneNumber}</p>
              
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {orderContext.razorPayDetails ? 'Online Payment' : 'COD' }
              <br />
              {paymentStatus && (
                <>
                <strong>Order Id: </strong>{paymentStatus.razorpay_order_id}
                <br />
                <strong>Payment Id: </strong>{paymentStatus.razorpay_payment_id}
                </>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                        {item.images.length>0 ?  <Image src={item.images[0].url} alt={item.productName} fluid rounded /> : <Image src={errorImage} alt={item.productName} fluid rounded /> }
                        </Col>
                        <Col>
                          {item.productName}
                        </Col>
                        <Col>
                          {item.quantity}
                        </Col>
                        <Col md={4}>
                        ₹{item.discountedPrice*item.quantity}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{PriceDetails.cartTotal}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{PriceDetails.shipping}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{PriceDetails.tax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{PriceDetails.totalPayable}</Col>
                </Row>
              </ListGroup.Item>
              {orderContext.uploadOrderErrorMessage &&<ListGroup.Item>
                 <Message variant='danger'>{orderContext.uploadOrderErrorMessage}</Message>
              </ListGroup.Item>}
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Confirm Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
