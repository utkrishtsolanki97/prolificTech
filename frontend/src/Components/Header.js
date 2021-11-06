import React, { useContext, useEffect, useState } from 'react'
import {  Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Logo from '../assets/logocorrect.svg'
import { LinkContainer } from 'react-router-bootstrap'
import './Header.scss'
import UserContext from '../context/Users/UserContext'
import SearchBox from './SearchBox'
import { Route } from 'react-router-dom'

const Header = () => {
    const userContext = useContext(UserContext)

    const [user, setUser] = useState(null)
    useEffect(()=>{
        const userInfo = localStorage.getItem('userDetails') ? JSON.parse(atob(localStorage.getItem('userDetails'))) : null
        setUser(userInfo)
    },[userContext.user])

    const logoutHandler = () => {
        userContext.logoutUser()
        // dispatch(logout())
      }


    return (
        <header>
            <Navbar bg="light" expand="lg">
                <div >
                    <LinkContainer to='/'>
                        <Navbar.Brand className="navLogo"><img className='brandLogo' src={Logo} alt='ProlificTech'  /> </Navbar.Brand>
                    </LinkContainer>
                </div>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="mr-auto my-2 my-lg-0"
                    navbarScroll
                    >
                    <LinkContainer to='/'>
                        <Nav.Link >Home</Nav.Link>
                    </LinkContainer>
                    {/* <LinkContainer to='/about'>
                        <Nav.Link >About Us</Nav.Link>
                    </LinkContainer> */}
                    <LinkContainer to='/contact-us'>
                        <Nav.Link >ContactUs</Nav.Link>
                    </LinkContainer>
                    
                    {user && user.isAdmin && (
                        <NavDropdown title='Admin' id='adminmenu'>
                            <LinkContainer to='/admin/userlist'>
                                <NavDropdown.Item>Users</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/productlist'>
                                <NavDropdown.Item>Products</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/orderlist'>
                                <NavDropdown.Item>Orders</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/adminscreen'>
                                <NavDropdown.Item>Admin</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/coupon'>
                                <NavDropdown.Item>Coupons</NavDropdown.Item>
                            </LinkContainer>
                            {/* <LinkContainer to='/admin/banner'>
                                <NavDropdown.Item>Banner</NavDropdown.Item>
                            </LinkContainer> */}
                        </NavDropdown>
                    )}
                    <Route  render={({history})=> <SearchBox history={history} />} />
                    </Nav>
                    {/* <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="mr-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-secondary">Search</Button>
                    </Form> */}
                    <Nav className="right">
                        
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <i className='fas fa-shopping-cart'></i> Cart
                            </Nav.Link>
                        </LinkContainer>
                        {/* <LinkContainer to='/login'>
                            <Nav.Link>
                                <i className='fas fa-user'></i> Sign In
                            </Nav.Link>
                        </LinkContainer> */}
                        {user ? (
                            <NavDropdown title={user.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className='fas fa-user'></i> Sign In
                                </Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
        </header>
    )
}

export default Header
