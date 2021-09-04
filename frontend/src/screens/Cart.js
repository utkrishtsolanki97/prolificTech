import React, { useContext, useEffect } from 'react'
import { Alert, Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductContext from '../context/Products/productContext'
import errorImage from '../assets/error-image-generic.png'

const Cart = ({ match, location, history }) => {
    const productContext = useContext(ProductContext)
    const productId = match.params.id
    console.log(productId);
  
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    // productContext.cart.reduce((acc, item) =>  console.log(typeof(item.quantity)))
  
    const cartItems = []
  
    useEffect(() => {
      if (productId) {
        productContext.addProductToCart(productId, qty)
      }
    }, [productId, qty])
  
  
    const checkoutHandler = () => {
      history.push('/login?redirect=shipping')
    }
  
    return (
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {productContext.cart.length === 0 ? (
            <Alert variant='primary'>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Alert>
          ) : (
            <ListGroup variant='flush'>
              {productContext.cart.map((item) => (
                <ListGroup.Item key={item.productName}>
                  <Row>
                    <Col md={2}>
                    {item.images.length>0 ?  <Image src={item.images[0].url} alt={item.productName} fluid rounded /> : <Image src={errorImage} alt={item.productName} fluid rounded /> }
                      
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/₹{item._id}`}>{item.productName}</Link>
                    </Col>
                    <Col md={2}>₹{item.discountedPrice}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.quantity}
                        onChange={(e) => productContext.addProductToCart(item._id, e.target.value)}
                      >
                        {[...Array(item.stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>₹{item.discountedPrice*item.quantity}</Col>
                    <Col md={1}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => productContext.removeProductFromCart(item._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                    
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({productContext.cart.reduce((acc, item) => acc + item.quantity, 0)})
                  items
                </h2>
                ₹
                {productContext.cart
                  .reduce((acc, item) => acc + item.quantity * item.discountedPrice, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={productContext.cart.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    )
}

export default Cart
