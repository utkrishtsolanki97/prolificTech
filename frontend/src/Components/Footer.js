import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Logo from '../assets/logo.png'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col md={4} sm={12} xs={12}>
                        <a href='https://prolifictech.in' target="_blank" rel="noreferrer"><img src={Logo} alt='logo' width='150px' height='90px' /></a>
                        
                        <p>Prolific Tech is a diversified establishment that provides several preparatory and specialized courses for K-12 students and professionals of Robotics & Coding and also lays a strong foundation of STEAM, Robotic Labs, Maker Spaces in schools. Lets Build!</p>
                        <a href='https://www.facebook.com/Prolifictech.in/' target="_blank" rel="noreferrer"><FacebookIcon/> </a>
                        <a href='https://twitter.com/tech_prolific' target="_blank" rel="noreferrer"><TwitterIcon/> </a>
                        <a href='https://www.instagram.com/prolific_tech/' target="_blank" rel="noreferrer"><InstagramIcon/> </a>
                        <a href='https://www.youtube.com/channel/UCo_Rq4gyQ9rpu0dc8MiXWww/featured' target="_blank" rel="noreferrer"><YouTubeIcon/> </a>
                        <a href='https://www.linkedin.com/company/prolifictechtutorial/' target="_blank" rel="noreferrer"><LinkedInIcon/> </a>
                    </Col>
                   <Col md={4} sm={12} xs={12}>
                       <h1>Popular Courses</h1>
                       <a href='https://prolifictech.in/all-courses-2/' target="_blank" rel="noreferrer">Android App Development</a><br/>
                       <a target="_blank" rel="noreferrer" href='https://prolifictech.in/all-courses-2/'>Game Development</a><br/>
                       {/* // eslint-disable-next-line */}
                       <a target="_blank" rel="noreferrer" href='https://prolifictech.in/all-courses-2/'>Virtual Robotics</a><br/>
                   </Col>
                   <Col md={4} sm={12} xs={12}>

                        <h1>Contact Info</h1>
                        <p><b>Address</b></p>
                        <p>Plot No. 26&27, Qutub Vihar ph-1, New Delhi-110071</p>
                        <br/>
                        <p><b>Phone</b></p>
                        <p>+91 9311541528</p>
                        <p>+91 8512879361</p>
                        <br/>
                        <p><b>Email</b></p>
                        <p>Infoprolifictech@gmail.com</p>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center py-3'>Copyright &copy; ProlificTech</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
