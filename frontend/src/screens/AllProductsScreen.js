import React, { useContext, useEffect, useState } from 'react'
import { Carousel, Col, Row, Spinner } from 'react-bootstrap'
import Product from '../Components/Product'
import ProductContext from '../context/Products/productContext'
import backgroundimage from '../assets/banner.png'
import { Link } from 'react-router-dom'

const AllProductsScreen = () => {
    const productContext = useContext(ProductContext)

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
  
    useEffect(() => {
        if (productContext.allproducts.length === 0) {
            productContext.getAllProducts()
            productContext.getBanners()
        }
         // eslint-disable-next-line
    }, [])

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
            {/* <div className='crousel'> */}
                {productContext.banner && productContext.banner[0] && productContext.banner[0].banner1 && <>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {productContext.banner[0].banner1.map((banner,index)=>{
                            return (<Carousel.Item key={index}>
                                <Link to={`/product/${banner.url}`} >
                                    <img
                                    className="d-block w-100 h-100"
                                    src={banner.image}
                                    alt="First slide"
                                    />
                                </Link>
                            </Carousel.Item>)
                        })}
                    </Carousel>
                </>}
            {/* </div> */}
            <br />
            <h3>All products</h3>
            
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

export default AllProductsScreen
