import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { useAuth } from 'contexts/authContext'

const Navbar = () => {
  const authContext = useAuth()
  if (authContext.authContext.authenticated)
    return (
      <div className="">
        {/* This does nothing, needs to be changed later on */}
        <Nav activeKey="/home">
          <Nav
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            className="px-6 pt-6 pb-2"
            activeKey="/home"
          >
            <Nav.Item className="px-4">
              <Nav.Link href="/">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item className="px-4">
              <Nav.Link href="/add_drink" eventKey="link-1">
                New Drink
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="px-4">
              <Nav.Link href="/history" eventKey="link-2">
                Histoy
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="px-4">
              <Nav.Link onClick={authContext.logout}>Log Out</Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav>
        {/* <h1 className="px-4 cursor-pointr">NavBar</h1> */}
      </div>
    )
  else return <div className=""></div>
}

export default Navbar
