import React,{useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button ,Modal} from 'react-bootstrap';

const CustomNavbar = () => {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogout = () => {
        setShowLogoutModal(true);
    }
    const handleConfirmLogout = () => {
        console.log("logout");
        localStorage.clear();
        navigate('/login');
        setShowLogoutModal(false);
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    return (
        <>
            <Navbar expand="lg" bg="white" className="shadow rounded p-3">
                <Navbar.Brand href="/">
                    <img
                        src="https://themewagon.github.io/alazea/img/bg-img/10.jpg"
                        alt="Logo"
                        width="30"
                        height="24"
                        className="d-inline-block align-text-top"
                    />{' '}
                    Examination System
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar" />
                <Navbar.Collapse id="navbar">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <NavLink className={({isActive}) => {
                            return isActive ? 'text-primary nav-link' : "nav-link"
                        }} to="/students">Students</NavLink>

                        <NavLink className={({isActive}) => {
                        return isActive ? 'text-primary nav-link' : "nav-link"
                    }} to="/exams">Exams</NavLink>

                        <NavLink className={({isActive}) => {
                        return isActive ? 'text-primary nav-link' : "nav-link"
                    }} to="/subjects">Subjects</NavLink>
                    </Nav>
                    <Nav className="ms-auto">
                        <NavDropdown
                            title={<>
                                <span className="me-2 d-none d-lg-inline text-gray-600 small">
                                    {localStorage.getItem('name')}
                                </span>
                                <img
                                    className="rounded-circle"
                                    src={localStorage.getItem('image')}
                                    width="20px"
                                    height="20px"
                                    alt="User Avatar"
                                />
                            </>}
                            id="userDropdown"
                        >
                            <NavDropdown.Item as={Link} to="/profile">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <Button onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout
                                </Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


            <Modal show={showLogoutModal} onHide={handleCancelLogout}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelLogout}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmLogout}>
                        Confirm Logout
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </>
    );
};

export default CustomNavbar;
