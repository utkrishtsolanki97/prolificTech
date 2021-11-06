import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row, Spinner, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import ProductContext from '../context/Products/productContext'
import {storage} from '../Firebase/Firebase'

const AdminScreen = () => {

    const productContext = useContext(ProductContext)
    const user = JSON.parse(atob(localStorage.getItem('userDetails')))

    

    const [banners, setBanners] = useState({})
    if(!banners){
        productContext.getBanners()
    }
    useEffect(() => {
        setBanners(productContext.banner[0])
    },[productContext.banner])

    const [banner1, setBanner1] = useState(false)
    const [banner2, setBanner2] = useState(false)
    const [mainScreen, setMainScreen] = useState(true)

    const [bannerSelect, setBannerSelect] = useState('banner1')
    
    const addNewBannerHandler = (e) => {
        e.preventDefault()
        console.log(banners);
        if(bannerSelect === 'banner1'){
            banners.banner1.push({url, image: images[0].url, created_on: Date.now(), user: user._id})
        }
        else{
            banners.banner2.push({url, image: images[0].url, shortDesc: description, created_on: Date.now(), user: user._id})
        }
        productContext.updateBanner(banners)
        console.log(banners);
    }

    const deleteHandler = (id) => {
        console.log('hi');
        console.log(banners);
        let tempbanner = banners
        if(banner1){
            let temp = tempbanner.banner1
            console.log(temp);
            const index = temp.findIndex(x => x._id === id);
            console.log(index);
            temp.splice(index, 1);
            console.log(temp);
            tempbanner.banner1 = temp
        }
        else{
            let temp = tempbanner.banner2
            console.log(temp);
            const index = temp.findIndex(x => x._id === id);
            console.log(index);
            temp.splice(index, 1);
            console.log(temp);
            tempbanner.banner2 = temp
        }
        console.log(tempbanner);
        productContext.updateBanner(tempbanner)
    }

    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    

    // // All the things used for firebase uploading
    const allInputs = {imgUrl: ''};
    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);
    const [images, setImages] = useState([]);
    const [loader, setLoader] = useState(false);
    const [deleteImg, setDeleteImg] = useState('');

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

    
    return (
        <div>
            {
                mainScreen ? (
                    <div className="mainScreen">
                        <div className="mAccountHeaading">
                            <h2>Admin Screen</h2>
                            <hr />
                        </div>
                        <br />
                        <br />
                        <br />
                        <Row>
                            <Col sm='3' xs='12' onClick={e => {setMainScreen(false); setBanner1(true);}} >
                                <h4>Banner 1 <i class="fas fa-chevron-right"></i></h4>
                                <p>View banner 1</p>
                            </Col>
                            <Col sm='3' xs='12' onClick={e => {setBanner2(true); setMainScreen(false)}}>
                                <h4>Banner 2 <i class="fas fa-chevron-right"></i></h4>
                                <p>View banner 2</p>
                            </Col>
                            <Col sm='3' xs='12' onClick={e => {setBanner2(false); setBanner1(false); setMainScreen(false)}}>
                                <h4>Add New Banner <i class="fas fa-chevron-right"></i></h4>
                                <p>Add banner</p>
                            </Col>
                        </Row>
                    </div>
                )  : banner1 ? (
                    <div>
                        <div className='btn btn-light my-3' onClick={e => {setBanner1(false); setBanner2(false); setMainScreen(true)}} >
                            Go Back
                        </div>
                        &emsp;
                        <div className='btn btn-light my-3' onClick={e => {setBanner1(false); setBanner2(false); setMainScreen(false)}} >
                            Add a banner
                        </div>
                        <br />
                        <div className="mAccountHeaading">
                            <h2>Banner 1</h2>
                            <hr />
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
                                        <td>
                                            {/* <LinkContainer to={`/`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                                </LinkContainer> */}
                                            <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(banner._id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                    )})}
                                </tbody>
                                </Table>
                        </div>
                        <br/><br/><br/>
                    </div>
                ) : banner2 ? (
                    <div>
                        <div className='btn btn-light my-3' onClick={e => {setBanner2(false); setBanner1(false); setMainScreen(true)}} >
                            Go Back
                        </div>
                        &emsp;
                        <div className='btn btn-light my-3' onClick={e => {setBanner1(false); setBanner2(false); setMainScreen(false)}} >
                            Add a banner
                        </div>
                        <br />
                        <div className="mAccountHeaading">
                            <h2>Banner 2</h2>
                            <hr />
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>URL</th>
                                    <th>SHORT DESCRIPTION</th>
                                    {/* <th>CREATED BY</th>
                                    <th>CREATED ON</th> */}
                                    <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {banners && banners.banner2 && banners.banner2.map((banner,index) => { 
                                        console.log(banner);
                                        return(
                                    <tr key={index+1}>
                                        <td>{index+1}</td>
                                        <td><img src={banner.image} alt={banner.image} /></td>
                                        <td>{banner.url}</td>
                                        <td>{banner.shortDesc}</td>
                                        {/* <td>{banner.user}</td>
                                        <td>{banner.created_on.substring(0, 10)}</td> */}
                                        {/* <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light' className='btn-sm'>
                                            Details
                                            </Button>
                                        </LinkContainer>
                                        </td> */}
                                        <td>
                                        <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(banner._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                        </td>
                                    </tr>
                                    )})}
                                </tbody>
                                </Table>
                        </div>
                        <br/><br/><br/>
                    </div>
                ): (
                    <div>
                        <div className='btn btn-light my-3' onClick={e => {setBanner2(false); setBanner1(false); setMainScreen(true)}} >
                            Go Back
                        </div>
                        <br />
                        <p>{bannerSelect}</p>
                        <div className="mAccountHeaading">
                            <h2>Add New Banner</h2>
                            <hr />
                            <Form onSubmit={addNewBannerHandler}>
                                <Form.Label>Select Banner</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={bannerSelect}
                                    onChange={(e) => setBannerSelect(e.target.value)}
                                >
                                    <option key="banner1" value="banner1">Banner 1</option>
                                    <option key="banner2" value="banner2">Banner 2</option>
                                </Form.Control>
                                <br />
                            {/* <Form.Select aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select> */}
                            {
                                bannerSelect==='banner1' ? (
                                    <Form.Group className="mb-3" controlId="formBasicUrl">
                                        <Form.Label>Enter URL</Form.Label>
                                        <Form.Control onChange={(e) => setUrl(e.target.value)} type="url" placeholder="Enter url" />
                                    </Form.Group>
                                ) : (
                                    <div>
                                        <Form.Group className="mb-3" controlId="formBasicUrl">
                                            <Form.Label>Enter URL</Form.Label>
                                            <Form.Control onChange={(e) => setUrl(e.target.value)} type="url" placeholder="Enter url" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicUrl">
                                            <Form.Label>Short Desc</Form.Label>
                                            <Form.Control onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter Short Description" />
                                        </Form.Group>
                                    </div>
                                )
                            }
                                
                            </Form>
                            
                        <Form onSubmit={handleFireBaseUpload}>
                            <input type="file" onChange={handleImageAsFile} />
                            {/* <Button type="submit">Upload the Image</Button> */}
                            { imageAsFile !== '' ? <Button type="submit">Upload the Image</Button> : <Button disabled type="submit">Upload the Image</Button>}
                            <br />
                            {loader ? <Spinner style={{marginLeft:"20%"}} animation="border" variant="info" /> : ''}
                            
                        </Form>
                        {images.length!==0 && <img src={images[0].url} /> }
                        { url !== '' && images.length !== 0 ? <Button onClick={addNewBannerHandler}>Upload the Banner</Button> : <Button disabled type="submit">Upload the Banner</Button>}
                        </div>
                        <br/><br/><br/>
                    </div>
                )
            }
        </div>
    )
}

export default AdminScreen
