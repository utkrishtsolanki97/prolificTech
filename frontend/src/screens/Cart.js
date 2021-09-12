import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Form, FormControl, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductContext from '../context/Products/productContext'
import errorImage from '../assets/error-image-generic.png'
import OrderContext from '../context/Orders/OrderContext'
import './Cart.css'

const Cart = ({ match, location, history }) => {
    const productContext = useContext(ProductContext)
    const orderContext = useContext(OrderContext)
    const productId = match.params.id
    console.log(productId);

    const [cartTotal, setCartTotal] = useState(productContext.cart ? parseFloat(productContext.cart.reduce((acc, item) => acc + item.quantity * item.discountedPrice, 0).toFixed(2)) : 0)
    const [tax, setTax] = useState(0)
    const [shipping, setShipping] = useState(0)
    const [totalPayable, setTotalPayable] = useState(0)

    useEffect(()=>{
      const cart  = parseFloat(productContext.cart.reduce((acc, item) => acc + item.quantity * item.discountedPrice, 0).toFixed(2))
      setCartTotal(cart)
      const taxapplicable = parseFloat((0.18*cart).toFixed(2))
      setTax(taxapplicable)
      const ship = cart > 1000 ? 0 : cart===0 ? 0 : 80
      setShipping(ship)
      console.log(typeof(cart));
      let total = (taxapplicable + cart +ship)
      // total = total.toFixed(2)
      setTotalPayable(total)
    },[productContext.cart])
    
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    // productContext.cart.reduce((acc, item) =>  console.log(typeof(item.quantity)))
  
    
  
    useEffect(() => {
      if (productId) {
        productContext.addProductToCart(productId, qty)
        setCartTotal(productContext.cart.reduce((acc, item) => acc + item.quantity * item.discountedPrice, 0).toFixed(2))
      }
       // eslint-disable-next-line
    }, [productId, qty])
  
  
    const checkoutHandler = () => {
      const price={
        cartTotal,
        tax,
        shipping,
        totalPayable
      }
      orderContext.setTotal(price)
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
                <h6>Have a Coupn</h6>
                <FormControl
                  placeholder="Enter Code Here"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                <Button type='button'>APPLY</Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6 className="detail-left">Cart Total</h6>
                <span className="detail-right detail-heading">₹{cartTotal}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6 className="detail-left">GST</h6>
                <span className="detail-right detail-heading">₹{tax}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6 className="detail-left">Shipping Charge</h6>
                <span className="detail-right detail-heading">₹{shipping}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6 className="detail-left">Amount Payable</h6>
                <span className="detail-right detail-heading">₹{totalPayable}</span>
              </ListGroup.Item>
              {/* <div className="cart-order">
                    
                    <div className="cart-coupn">
                        <span  style={{marginBottom:"10px"}}>Have a coupn</span>
                        <br />
                        <input type="text" className="coupn-input" placeholder="Enter code here" />
                        <button className="cart-button-color cart-small-button">APPLY</button>
                    </div>
                    <div >
                        <span className="billing-details">BILLING DETAILS</span>
                        <div className="side-box">
                            
                            <div className="detail-ul">
                                <span className="detail-left">Cart Total</span>
                                <span className="detail-right detail-heading">₹{cartTotal}</span>
                            </div>
                            <br />
                            <div className="detail-ul">
                                <span className="detail-left">GST</span>
                                <span className="detail-right">₹{tax}</span>
                            </div>
                            <br />
                            <div className="detail-ul" >
                                <span className="detail-left">Shipping Charges</span>
                                <span className="detail-right">₹{shipping}</span>
                            </div>
                            <br />
                            <div className="detail-ul">
                                <span className="detail-left detail-heading">Total Payable</span>
                                <span className="detail-right detail-heading">₹{totalPayable}</span>
                            </div>
                            <br />
                        </div>
                    </div>
                    
                </div> */}
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
