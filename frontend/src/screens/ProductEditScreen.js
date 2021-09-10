import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Spinner, Alert, Table, Dropdown } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import ProductContext from '../context/Products/productContext'
import {storage} from '../Firebase/Firebase'

const ProductEditScreen = ({ match, history }) => {

  useEffect(() => {
    const userInfo = localStorage.getItem('userDetails') && JSON.parse(atob(localStorage.getItem('userDetails')))
    if (userInfo && userInfo.isAdmin) {
      
    } else {
      history.push('/login')
    }
  })
  const productId = match.params.id
  const productContext = useContext(ProductContext)


  const [productName, setProductName] = useState('')
  const [stock, setStock] = useState(0)
  const [subCategory, setSubCategory] = useState('Select Sub Category')
  const [description, setDescription] = useState('')
  const [actualPrice, setActualPrice] = useState(0)
  const [discountedPrice, setDiscountedPrice] = useState(0)
  const [returnType, setReturnType] = useState(false)
  const [HSN, setHSN] = useState(0)
  const [categorySelection, setCategorySelection] = useState(false)

  
  // // All the things used for firebase uploading
  const allInputs = {imgUrl: ''};
  const [imageAsFile, setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [deleteImg, setDeleteImg] = useState('');


  useEffect(()=>{
    productContext.getProduct(productId)
  },[])

  useEffect(()=>{
    if(productContext.adminupdateProductStatus){
      console.log('into');
      productContext.refreshAdminUpdateErrorMesssage()
      // userContext.refreshAdminUpdateErrorMesssage()
      history.push('/admin/productlist')
    }
    else{
      console.log(productContext.product);
      setProductName(productContext.product.productName)
      setStock(productContext.product.stock)
      setSubCategory(productContext.product.subCategory)
      setDescription(productContext.product.description)
      setActualPrice(productContext.product.actualPrice)
      setDiscountedPrice(productContext.product.discountedPrice)
      setReturnType(productContext.product.returnType)
      setHSN(productContext.product.HSN)
      setImages(productContext.product.images)
    }
  },[productContext.product, productContext.adminupdateProductStatus])

  const uploadProductHandler = (e) => {
    e.preventDefault()
    productContext.refreshAdminUpdateErrorMesssage()
    productContext.adminupdateProduct(productId,productName,subCategory,description,HSN,actualPrice,discountedPrice,images,stock)
}

const deleteFromFirebase = (e) => {
    
    e.preventDefault();
    console.log(deleteImg);
    let pictureRef = storage.refFromURL(deleteImg);
    //2.
    pictureRef.delete()
        .then(() => {
        //3.
        // setImages(allImages.filter((image) => image !== url));
        alert("Picture is deleted successfully!");
        })
        .catch((err) => {
        console.log(err);
        });
    removefromarray(images,'url',deleteImg);
    setDeleteImg('');
}
const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
}
const handleFireBaseUpload = e => {
    e.preventDefault()
    setLoader(true);
  if(imageAsFile === '') {
    console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
  }
  const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
  uploadTask.on('state_changed', 
  (snapShot) => {
    console.log(snapShot)
  }, (err) => {
    //catches the errors
    console.log(err)
  }, () => {
    // gets the functions from storage refences the image storage in firebase by the children
    // gets the download url then sets the image from firebase as the value for the imgUrl key:
    storage.ref('images').child(imageAsFile.name).getDownloadURL()
     .then(fireBaseUrl => {
       setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
       console.log(imageAsFile.name);
       setImages([...images, {url:fireBaseUrl, name:imageAsFile.name}]);
     })
     setLoader(false);
  })
  e.target.reset();
  setImageAsFile(imageFile => '')
  }
const removefromarray = function(arr, attr, value){
    let i = arr.length;
    while(i--){
        if( arr[i] 
            && arr[i].hasOwnProperty(attr) 
            && (arguments.length > 2 && arr[i][attr] === value ) ){ 

            arr.splice(i,1);

        }
    }
    return arr;
}


  const successUpdate = false
  
  const error = '', loading=false

  const handleDropdownSelection = (e) => {
        console.log(e);
        if (e==='others') {
            setCategorySelection(true)
        } else {
            setCategorySelection(false)
            setSubCategory(e)
        }
    }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {/* {loadingUpdate && <Spinner animation="border" />}
        {errorUpdate && <Alert variant='danger'>{error}</Alert>} */}
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <Form onSubmit={uploadProductHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='actualprice'>
              <Form.Label>Actual Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={actualPrice}
                onChange={(e) => setActualPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='discountedprice'>
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group> */}

            <Form.Group controlId='subcategory'>
              <Form.Label>Category</Form.Label>
              <Dropdown onSelect={handleDropdownSelection}>
                        <Dropdown.Toggle id="dropdown-basic">
                            {subCategory}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey='Electronics Development'>Electronics Development</Dropdown.Item>
                            <Dropdown.Item eventKey='Robotics'>Robotics</Dropdown.Item>
                            <Dropdown.Item eventKey='DIY Kits'>DIV Kits</Dropdown.Item>
                            <Dropdown.Item eventKey='Rapid Prototyping Tools'>Rapid Prototyping Tools</Dropdown.Item>
                            <Dropdown.Item eventKey='Mechnical Tools'>Mechnical Tools</Dropdown.Item>
                            <Dropdown.Item eventKey='Electric Tools'>Electric Tools</Dropdown.Item>
                            <Dropdown.Item eventKey='Measurement Tools'>Measurement Tools</Dropdown.Item>
                            <Dropdown.Item eventKey='Biology Kit'>Biology Kit</Dropdown.Item>
                            <Dropdown.Item eventKey='Astronomy Equipment'>Astronomy Equipment</Dropdown.Item>
                            <Dropdown.Item eventKey='Textile Equipment'>Textile Equipment</Dropdown.Item>
                            <Dropdown.Item eventKey='Power Supply & Accessories'>Power Supply & Accessories</Dropdown.Item>
                            <Dropdown.Item eventKey='Saftey Equipment'>Saftey Equipment</Dropdown.Item>
                            <Dropdown.Item eventKey='others'>Other</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    { categorySelection &&
                    <Form.Control
                    type='text'
                    placeholder='Enter SubCategory'
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    ></Form.Control>}
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as='textarea'
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='hsn'>
              <Form.Label>HSN</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter HSN'
                value={HSN}
                onChange={(e) => setHSN(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='return'>
              <Form.Check
                type='switch'
                label='Returnable'
                checked={returnType}
                onChange={(e) => setReturnType(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
        <Form onSubmit={handleFireBaseUpload}>
                <input type="file" onChange={handleImageAsFile} />
                {/* <Button type="submit">Upload the Image</Button> */}
                { imageAsFile !== '' ? <Button type="submit">Upload the Image</Button> : <Button disabled type="submit">Upload the Image</Button>}
                <br />
                {loader ? <Spinner style={{marginLeft:"20%"}} animation="border" variant="info" /> : ''}
                
            </Form>
        <Table>
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Image Title</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {images && images.map((image, index)=> {
                        return (<tr key={index}>
                            <td>{index}</td>
                            <td>{image.name}</td>
                            <td><img src={image.url} alt={image.name} height="120px" /></td>
                            <td>
                            <Form onClick={deleteFromFirebase}>
                            {/* <Form onClick={() => console.log('delete image')}> */}
                            
                              <Button variant='danger' className='btn-sm' onClick={() => setDeleteImg(image.url)} >
                                <i className='fas fa-trash'></i>
                              </Button>
                            </Form>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </Table>
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
