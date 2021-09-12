import React, { useContext, useEffect } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import Product from '../Components/Product'
import ProductContext from '../context/Products/productContext'

const AllProductsScreen = () => {
    const productContext = useContext(ProductContext)

  
    useEffect(() => {
        if (productContext.allproducts.length === 0) {
            productContext.getAllProducts()
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
    return (
        <div>
            <h1>All products</h1>
            
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
