import React, { useContext, useEffect, useState } from 'react'
import { Carousel, Col, Row, Spinner } from 'react-bootstrap'
import Product from '../Components/Product'
import ProductContext from '../context/Products/productContext'
import backgroundimage from '../assets/banner.png'
import { Link } from 'react-router-dom'

const AllProductsScreen = ({match}) => {
    const keyword = match.params.keyword
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
            <div className='secondary-banner'>
                <div class="container-fluid">
                    <div class="row flex-row flex-nowrap">
                        {productContext.banner && productContext.banner[0] && productContext.banner[0].banner2 && <>
                            
                            {productContext.banner[0].banner2.map((banner,index)=>{
                                return (
                                <div class="col-6 col-md-3" key={index}>
                                    <div class="card card-block">
                                        <h6><b>{banner.shortDesc}</b></h6>
                                        <Link to={`/product/${banner.url}`} >
                                            <img
                                            className="d-block w-100 h-100"
                                            src={banner.image}
                                            alt="First slide"
                                            />
                                        </Link>
                                    </div>
                                    
                                </div>
                                )
                            })}
                        </>}
                        
                    </div>
                </div>
            </div>
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
