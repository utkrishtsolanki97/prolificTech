import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Logo from '../assets/logocorrect.svg'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './Footer.scss'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer >
            <div className='footer-background'>
            <Container className="footerCss">
                <Row>
                    <Col className='description' md={4} sm={12} xs={12}>
                        <a href='https://prolifictech.in' target="_blank" rel="noreferrer"><img src={Logo} alt='logo' width='150px' height='90px' /></a>
                        
                        <p>Prolific Tech is a diversified establishment that provides several preparatory and specialized courses for K-12 students and professionals of Robotics & Coding and also lays a strong foundation of STEAM, Robotic Labs, Maker Spaces in schools. Lets Build!</p>
                        <a href='https://www.facebook.com/Prolifictech.in/' target="_blank" rel="noreferrer"><FacebookIcon/> </a>
                        <a href='https://twitter.com/tech_prolific' target="_blank" rel="noreferrer"><TwitterIcon/> </a>
                        <a href='https://www.instagram.com/prolific_tech/' target="_blank" rel="noreferrer"><InstagramIcon/> </a>
                        <a href='https://www.youtube.com/channel/UCo_Rq4gyQ9rpu0dc8MiXWww/featured' target="_blank" rel="noreferrer"><YouTubeIcon/> </a>
                        <a href='https://www.linkedin.com/company/prolifictechtutorial/' target="_blank" rel="noreferrer"><LinkedInIcon/> </a>
                    </Col>
                   <Col md={4} sm={12} xs={12}>
                       <h1>Useful Links</h1>
                       <Link to='/refund-cancellation-policy'><b>Refund and Cancelation</b></Link><br />
                       <Link to='/privacy-policy'><b>Privacy Policy</b></Link><br />
                       <Link to='/terms-conditions'><b>Terms & Conditions</b></Link><br />
                       <Link to='/shipping-policy'><b>Shipping Policy</b></Link>
                   </Col>
                   <Col md={4} sm={12} xs={12}>

                        <h1>Contact Info</h1>
                        <p><b>Address</b></p>
                        <p>Plot No. 26&27, Qutub Vihar ph-1, New Delhi-110071</p>
                        {/* <br/> */}
                        <p><b>Phone</b></p>
                        <p>+91 9311541528</p>
                        <p>+91 8512879361</p>
                        {/* <br/> */}
                        <p><b>Email</b></p>
                        <p>Infoprolifictech@gmail.com</p>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center py-3'>Copyright &copy; ProlificTech</Col>
                </Row>
            </Container>
            </div>
        </footer>
    )
}

export default Footer
