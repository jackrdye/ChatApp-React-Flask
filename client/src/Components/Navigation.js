import React from 'react'
import { Navbar, NavLink, Container, Nav } from 'react-bootstrap'

function Navigation() {
  return (
    <>
      <Navbar bg="primary" variant="dark" style={{height: '56px'}}>
      <Container>
      <Navbar.Brand href="/">EMS</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
        <Nav.Link href="/Messages">Messages</Nav.Link>
      </Nav>
      </Container>
      </Navbar>
    </>
  )
}

export default Navigation