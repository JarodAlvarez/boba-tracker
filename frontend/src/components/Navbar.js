import React from 'react';
import Nav from 'react-bootstrap/Nav'

const Navbar = () => {
    return (
        <div className="">
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
                <Nav className="flex cursor-pointr items-end " activeKey="/home">
                    <Nav.Item className="px-4">
                        <Nav.Link href="/home">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="px-4">
                        <Nav.Link eventKey="link-1">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="px-4">
                        <Nav.Link eventKey="link-2">Link</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="px-4">
                        <Nav.Link eventKey="disabled" disabled>
                            Disabled
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Nav>
            {/* <h1 className="px-4 cursor-pointr">NavBar</h1> */}
        </div>
    )
}

export default Navbar
