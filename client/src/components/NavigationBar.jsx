import React from 'react'
import { Button } from  'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container, NavDropdown, Form, Nav } from 'react-bootstrap'

import { logout } from '../redux/slice/authSlice'

const NavigationBar = () => {

  const dispatch = useDispatch()
  const { token, UserData } = useSelector((state) => state.auth)

  const onLogout = async () => {
    try{
      dispatch(logout())
    }catch(err){
      console.log('Logout failed')
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">TrendTide</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            { token ? 
            <>
              <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                Something else here
                </NavDropdown.Item>
              </NavDropdown> 
            </> :
            <>
              <Nav.Link href="/sign-up">Sign up</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </> }
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
