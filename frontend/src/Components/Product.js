import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import errorImage from '../assets/error-image-generic.png'
import './Product.scss'
// import Rating from './Rating'

const Product = ({ product }) => {
    const discount = (((product.actualPrice-product.discountedPrice)/product.actualPrice)*100).toFixed(2)
    // console.log(product.images[0].url.height);
  return (
    <div className="product-grid">
      <Card className='my-3 p-3 rounded'>
        <div className="product-image">
          <Link to={`/product/${product._id}`}>
              
              {product.images && product.images.length>=1  ?  <Card.Img className="image" src={product.images[0].url}  /> : <Card.Img src={errorImage} variant='top' /> }
            
          </Link>
        </div>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.productName.length < 35 ? product.productName : product.productName.substring(0,35)+'...'}</strong>
            </Card.Title>
          </Link>

          {/* <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text> */}
          <Card.Text as='h6'>
            <span>
              <span className="product-strike"><b>₹ {product.discountedPrice}</b></span>
                <span className="product-discountedPrice">₹ {product.actualPrice}</span>
                
            </span>
            <span className="product-discountPercentage">({discount}% OFF)</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Product