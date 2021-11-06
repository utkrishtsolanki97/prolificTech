import { Table } from 'react-bootstrap'
import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../context/Products/productContext'

const BannerListScreen = () => {
    const productContext = useContext(ProductContext)
    const [banners, setBanners] = useState({})
    

    if(!banners){
        productContext.getBanners()
    }
    useEffect(() => {
        setBanners(productContext.banner[0])
    },[productContext.banner])


    return (
        <div>
            <h1>Banner 1</h1>
            <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>URL</th>
              <th>CREATED BY</th>
              <th>CREATED ON</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {banners && banners.banner1 && banners.banner1.map((banner,index) => { 
                console.log(banner);
                return(
              <tr key={index+1}>
                <td>{index+1}</td>
                <td><img src={banner.image} alt={banner.image} /></td>
                <td>{banner.url}</td>
                <td>{banner.user}</td>
                <td>{banner.created_on.substring(0, 10)}</td>
                {/* <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td> */}
              </tr>
            )})}
          </tbody>
        </Table>
        </div>
    )
}

export default BannerListScreen
