import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import errorImage from '../assets/error-image-generic.png'
import './Product.css'
// import Rating from './Rating'

const Product = ({ product }) => {
    const discount = (((product.actualPrice-product.discountedPrice)/product.actualPrice)*100).toFixed(2)
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
          
          {product.images.length>=1  ?  <Card.Img src={product.images[0].url} variant='top' /> : <Card.Img src={errorImage} variant='top' /> }
        
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.productName}</strong>
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
  )
}

export default Product