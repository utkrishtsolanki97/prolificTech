import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Row, Form, Spinner, Table, Alert, Dropdown } from 'react-bootstrap'
import ProductContext from '../context/Products/productContext'
import {storage} from '../Firebase/Firebase'
const UploadProducts = ({history}) => {
    
    useEffect(() => {
        const userInfo = localStorage.getItem('userDetails') && JSON.parse(atob(localStorage.getItem('userDetails')))
        if (userInfo && userInfo.isAdmin) {
          
        } else {
          history.push('/login')
        }
      })

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
    
    useEffect(() => {
        console.log(deleteImg);
        console.log(images);
        console.log(imageAsUrl);
    })

    const uploadProductHandler = (e) => {
        e.preventDefault()
        productContext.uploadProduct(productName,subCategory,description,HSN,actualPrice,discountedPrice,images,stock,returnType)
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
        console.log();
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

    useEffect(()=>{
        if(productContext.uploadProductStatus){
            history.push('/admin/productlist')
        }
        
    },[productContext.uploadedProduct, productContext.uploadProductErrorMessage])

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
        <div style={{marginTop:'50px'}}>
            <h1>Upload The Product Details</h1>
            {productContext.uploadProductErrorMessage && <Alert variant='danger'>{productContext.uploadProductErrorMessage}</Alert>}
            <Form style={{margin:"5%", padding:"5%", border:"1px solid #eee"}} onSubmit={e => e.preventDefault()}>
                <Form.Group controlId='password'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Name of Product'
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='subCategory'>
                    <Form.Label>SubCategory</Form.Label>
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
                {/* <Form.Group controlId='subCategory'>
                    <Form.Label>SubCategory</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter SubCategory'
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group> */}
                <Form.Group controlId='descriptio'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter Description for the product'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='actualPrice'>
                    <Form.Label>Actual Price</Form.Label>
                    <Form.Control
                    type='number'
                    placeholder='Enter Actual Price'
                    value={actualPrice}
                    onChange={(e) => setActualPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='discountedPrice'>
                    <Form.Label>Discounted Price</Form.Label>
                    <Form.Control
                    type='number'
                    placeholder='Enter Discounted Price'
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='stock'>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                    type='number'
                    placeholder='Enter Stock'
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='HSN'>
                    <Form.Label>HSN</Form.Label>
                    <Form.Control
                    type='number'
                    placeholder='Enter HSN'
                    value={HSN}
                    onChange={(e) => setHSN(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Return</Form.Label>
                    <Form.Check 
                        type="switch"
                        id="custom-switch"
                        value={returnType}
                        onChange={(e) => setReturnType(!returnType)}
                    />
                </Form.Group>

            </Form>
            
            
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
                    {images.map((image, index)=> {
                        return (<tr key={index}>
                            <td>{index}</td>
                            <td>{image.name}</td>
                            <td><img src={image.url} alt={image.name} height="120px" /></td>
                            <td>
                            <Form onClick={deleteFromFirebase}>
                                <Button variant='danger' className='btn-sm' onClick={() => setDeleteImg(image.url)} >
                                <i className='fas fa-trash'></i>
                              </Button>
                            </Form>
                            </td>
                        </tr>)
                    })}
                </tbody>
            </Table>
            <Button onClick={uploadProductHandler}>
                <i class="fas fa-upload"></i>  Upload Product
            </Button>
        </div>
    )
}

export default UploadProducts
