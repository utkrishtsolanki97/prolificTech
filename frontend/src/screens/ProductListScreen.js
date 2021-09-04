import React, { useContext, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Alert, Spinner, Image } from 'react-bootstrap'
import ProductContext from '../context/Products/productContext'
import errorImage from '../assets/error-image-generic.png'
// import Paginate from '../components/Paginate'


const ProductListScreen = ({ history, match }) => {

  useEffect(() => {
    const userInfo = localStorage.getItem('userDetails') && JSON.parse(atob(localStorage.getItem('userDetails')))
    if (userInfo && userInfo.isAdmin) {
      
    } else {
      history.push('/login')
    }
  })
  // const pageNumber = match.params.pageNumber || 1

  // const dispatch = useDispatch()

  // const productList = useSelector((state) => state.productList)
  // const { loading, error, products, page, pages } = productList

  // const productDelete = useSelector((state) => state.productDelete)
  // const {
  //   loading: loadingDelete,
  //   error: errorDelete,
  //   success: successDelete,
  // } = productDelete

  const loading = false,error = null, products=[]

  // const productCreate = useSelector((state) => state.productCreate)
  // const {
  //   loading: loadingCreate,
  //   error: errorCreate,
  //   success: successCreate,
  //   product: createdProduct,
  // } = productCreate

  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin

  // useEffect(() => {
  //   dispatch({ type: PRODUCT_CREATE_RESET })

  //   if (!userInfo || !userInfo.isAdmin) {
  //     history.push('/login')
  //   }

  //   if (successCreate) {
  //     history.push(`/admin/product/${createdProduct._id}/edit`)
  //   } else {
  //     dispatch(listProducts('', pageNumber))
  //   }
  // }, [
  //   dispatch,
  //   history,
  //   userInfo,
  //   successDelete,
  //   successCreate,
  //   createdProduct,
  //   pageNumber,
  // ])

  


  const productContext = useContext(ProductContext)

  useEffect(() => {
    const userInfo = localStorage.getItem('userDetails') && JSON.parse(atob(localStorage.getItem('userDetails')))
    console.log('userInfo',userInfo);
    if (userInfo && userInfo.isAdmin) {
      // dispatch(listUsers())
      productContext.getAllProducts()
    } else {
      history.push('/login')
    }
  }, [ history,  productContext.product, productContext.deleteProductStatus])
  
    

  const createProductHandler = () => {
    history.push('/admin/uploadproducts')
    // dispatch(createProduct())
  }
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      productContext.deleteProduct(id)
      // dispatch(deleteProduct(id))
    }
  }

  useEffect(()=>{
    if(productContext.deleteProductStatus){
      productContext.refreshDeleteErrorMesssage()
    }
  },[productContext.deleteProductStatus])

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {/* {loadingDelete && <Spinner animation="border" />}
      {errorDelete && <Alert variant='danger'>{errorDelete}</Alert>}
      {loadingCreate && <Spinner animation="border" />}
      {errorCreate && <Alert variant='danger'>{errorCreate}</Alert>} */}
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>STOCK</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productContext.allproducts && productContext.allproducts.map((product,index) => (
                <tr key={product._id}>
                  <td>{index+1}</td>
                  <td>{product.images.length>0 ?  <Image  src={product.images[0].url} alt={product.productName} fluid rounded width='100px' /> : <Image src={errorImage} alt={product.productName} fluid rounded width='100px' /> }</td>
                  <td>{product.productName}</td>
                  <td>${product.discountedPrice}</td>
                  <td>{product.subCategory}</td>
                  <td>{product.stock}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </>
      )}
    </>
  )
}

export default ProductListScreen
