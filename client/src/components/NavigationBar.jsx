import React, { useState } from 'react'
import { Button } from  'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Container, NavDropdown, Form, Nav } from 'react-bootstrap'
import { TiHome } from "react-icons/ti";
import { MdFeed, MdHome } from "react-icons/md";

import { logout } from '../redux/slice/authSlice'

const NavigationBar = ({ setShowPostCreateModal, setShowPostDetailModal }) => {

  // const [selectedItem, setSelectedItem] = useState('')
  const dispatch = useDispatch()
  const { token, UserData } = useSelector((state) => state.auth)

  const onLogout = async () => {
    try{
      dispatch(logout())
    }catch(err){
      console.log('Logout failed')
    }
  }

  // const onSelect = (eventKey) => {
  //   setSelectedItem(eventKey)
  // }

  return (
    <Navbar sticky='top' expand="lg" className="bg-body-tertiary">
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
              <Nav.Link onClick={(e)=>setShowPostCreateModal(true)}>Create</Nav.Link>
              <Nav.Link onClick={(e)=>setShowPostDetailModal(true)}>View</Nav.Link>
              <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              <NavDropdown style={{backgroundColor: '#FFFFFF'}} className='rounded' title='Select' id="navbarScrollingDropdown">
                <NavDropdown.Item className='d-flex' eventKey='Home' href='/'><MdHome style={{fontSize: '20px', marginRight: '5px'}} />Home</NavDropdown.Item>
                <NavDropdown.Item className='d-flex' eventKey='Feed' href='/'><MdFeed style={{fontSize: '20px', marginRight: '5px'}} />Feed</NavDropdown.Item>
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
