import Button from 'react-bootstrap/Button';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ModalComponent from './ModalComponent';

const NavbarComponent = () => {
  return (
    <Navbar expand="lg">
      <Container className="p-3">
        <div className="nav-title fs">BOOKSCAPE</div>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="teks-center"></Nav>
        </Navbar.Collapse>
        <div className="nav-title">
          <ModalComponent />
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
