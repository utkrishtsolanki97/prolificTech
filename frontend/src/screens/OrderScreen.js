import React, {  useEffect, useContext } from 'react'
// import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, Spinner, Alert } from 'react-bootstrap'
import OrderContext from '../context/Orders/OrderContext'
import errorImage from '../assets/error-image-generic.png'


const OrderScreen = ({ match, history }) => {
  const userInfo = localStorage.getItem('userDetails') && JSON.parse(atob(localStorage.getItem('userDetails')))
  const orderId = match.params.id
  const orderContext = useContext(OrderContext)

  // const Message= '', loadingPay=false,Loader=false,sdkReady=false,PayPalButton=false,loadingDeliver=false

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    
  }, [history,orderId,userInfo])

  useEffect(()=>{
    orderContext.getSelectedOrder(orderId)
     // eslint-disable-next-line
  },[])

  console.log(orderContext.selectedOrder);
  // const successPaymentHandler = (paymentResult) => {
  //   console.log(paymentResult)
  //   // dispatch(payOrder(orderId, paymentResult))
  // }

  const deliverHandler = () => {
    // dispatch(deliverOrder(order))
  }

  
  return !orderContext.loading ?  (
      <>
        <h1>Order {orderContext.selectedOrder._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              {orderContext.selectedOrder.user && <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {orderContext.selectedOrder.user.name}
                </p>
                <p>
                  <strong>Email: </strong>{' '}
                  <a href={`mailto:${orderContext.selectedOrder.user.email}`}>{orderContext.selectedOrder.user.email}</a>
                </p>
                {orderContext.selectedOrder.shippingAddress && <p>
                  <strong>Address:</strong>
                  {orderContext.selectedOrder.shippingAddress.address}, {orderContext.selectedOrder.shippingAddress.city}{' '}
                  {orderContext.selectedOrder.shippingAddress.postalCode},{' '}
                  {orderContext.selectedOrder.shippingAddress.country}
                </p>}
                {orderContext.selectedOrder.is_delivered ? (
                  <Alert variant='success'>
                    Delivered on {orderContext.selectedOrder.deliveredAt}
                  </Alert>
                ) : (
                  <Alert variant='danger'>Not Delivered</Alert>
                )}
              </ListGroup.Item>}
  
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {orderContext.selectedOrder.payment_method}
                </p>
                {orderContext.selectedOrder.isPaid ? (
                  <Alert variant='success'>Paid on {orderContext.selectedOrder.paid_at.substring(0, 10)}</Alert>
                ) : (
                  <Alert variant='danger'>Not Paid</Alert>
                )}
              </ListGroup.Item>
  
              <ListGroup.Item>
                <h2>Order Items</h2>
                {orderContext.selectedOrder.orderItems && orderContext.selectedOrder.orderItems.length === 0 ? (
                  <Alert>Order is empty</Alert>
                ) : (
                  <ListGroup variant='flush'>
                    {orderContext.selectedOrder.orderItems && orderContext.selectedOrder.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                          {item.image  ?  <Image src={item.image} alt={item.productName} fluid rounded /> : <Image src={errorImage} alt={item.productName} fluid rounded /> }
                          </Col>
                          <Col>
                            <Link to={`/product/${item._id}`}>
                              {item.productName}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.quantity} x ${item.price} = ${item.quantity * item.price}
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
                    <Col>${orderContext.selectedOrder.itemsPrice && orderContext.selectedOrder.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${orderContext.selectedOrder.shipping}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${orderContext.selectedOrder.tax}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${orderContext.selectedOrder.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {/* {!orderContext.selectedOrder.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={orderContext.selectedOrder.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )} */}
                {/* {loadingDeliver && <Loader />} */}
                {userInfo &&
                  userInfo.isAdmin &&
                  orderContext.selectedOrder.isPaid &&
                  !orderContext.selectedOrder.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type='button'
                        className='btn btn-block'
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    ) : (<Spinner animation="border" />)
  
}

export default OrderScreen
