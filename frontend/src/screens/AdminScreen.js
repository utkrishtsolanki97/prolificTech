import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

const AdminScreen = () => {
    const [banner1, setBanner1] = useState(false)
    const [banner2, setBanner2] = useState(false)
    const [mainScreen, setMainScreen] = useState(true)
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
                                <p>View, modify banner 1</p>
                            </Col>
                            <Col sm='3' xs='12' onClick={e => {setBanner2(true); setMainScreen(false)}}>
                                <h4>Banner 2 <i class="fas fa-chevron-right"></i></h4>
                                <p>View, modify, banner 2</p>
                            </Col>
                            {/* <Col sm='3' xs='12' onClick={e => {setMainScreen(false)}}>
                                <h4>Misclaneous <i class="fas fa-chevron-right"></i></h4>
                                <p>View, modify misclaneous</p>
                            </Col> */}
                        </Row>
                    </div>
                )  : banner1 ? (
                    <div>
                        <div className='btn btn-light my-3' onClick={e => {setBanner1(false); setMainScreen(true)}} >
                            Go Back
                        </div>
                        <br />
                        <div className="mAccountHeaading">
                            <h2>Banner 1</h2>
                            <hr />
                        </div>
                        <br/><br/><br/>
                    </div>
                ) : (
                    <div>
                        <div className='btn btn-light my-3' onClick={e => {setBanner2(false); setMainScreen(true)}} >
                            Go Back
                        </div>
                        <br />
                        <div className="mAccountHeaading">
                            <h2>Banner 2</h2>
                            <hr />
                        </div>
                        <br/><br/><br/>
                    </div>
                )
            }
        </div>
    )
}

export default AdminScreen
