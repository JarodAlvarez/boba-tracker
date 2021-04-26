import React from 'react';
import Nav from 'react-bootstrap/Nav';

const Navbar = () => {
    return (
        <div className="">
            {/* This does nothing, needs to be changed later on */}
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
                <Nav 
                    style={{display: 'flex', justifyContent: 'flex-end'}} 
                    className="px-6 pt-6 pb-2"
                    activeKey="/home"
                >
                    <Nav.Item className="px-4">
                        <Nav.Link href="/home">Dashboard</Nav.Link>
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
