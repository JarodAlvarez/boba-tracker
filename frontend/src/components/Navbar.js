import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap'
// import Dashboard from '../pages/Dashboard';

const Navbar = () => {
    return (
        <div className="">
            {/*React-bootstrap Nav */}
            {/* This does nothing, needs to be changed later on for buttons to function*/}
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
                <Nav
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                    className="px-6 pt-6 pb-2 font-sans"
                    activeKey="/home"
                >
                    <Nav.Item className="px-4">
                        <Nav.Link as={Link} to="/dashboard" >Dashboard</Nav.Link>
                    </Nav.Item>

                    <Nav.Item className="px-4">
                        <Nav.Link eventKey="link-1">New Drink</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="px-4">
                        <Nav.Link eventKey="link-2">Histoy</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="px-4">
                        <Nav.Link eventKey="disabled">Log Out</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Nav>
            {/* <h1 className="px-4 cursor-pointr">NavBar</h1> */}
        </div>
    )
}

export default Navbar
