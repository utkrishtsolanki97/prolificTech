import React, { useContext, useEffect, useState } from 'react'
import { Carousel, Col, Row, Spinner } from 'react-bootstrap'
import Product from '../Components/Product'
import ProductContext from '../context/Products/productContext'
import backgroundimage from '../assets/banner.png'
import { Link } from 'react-router-dom'

const SearchScreen = ({match}) => {
    const keyword = match.params.keyword
    const productContext = useContext(ProductContext)
    console.log(keyword);
  
    useEffect(() => {
            productContext.getAllProducts(keyword)
         // eslint-disable-next-line
    }, [keyword])

    // useEffect(() => {
    //     console.log('into screen',productContext.allproducts);
    //     productContext.allproducts.map((product)=>{
    //         console.log(product);
    //     })
    // }, [productContext.allproducts])
  
    if(productContext.loading){
        return <Spinner animation="border" />
    }
    console.log(productContext.banner);
    return (
        <div>
            
            <h3>Showing results for <b>{keyword}</b></h3>
            
            <>
                <Row>
                    {productContext.allproducts.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                    ))}
                </Row>
                {/* <Paginate
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ''}
                /> */}
            </>
                
            
            
        </div>
    )
}

export default SearchScreen
