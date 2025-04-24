// src/components/Header.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Hệ thống Nhận dạng Mống mắt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/members">Quản lý nhân viên</Nav.Link>
            <Nav.Link as={Link} to="/statistics">Thống kê</Nav.Link>
            <Nav.Link as={Link} to="/training/datasets">Huấn luyện</Nav.Link>
            <Nav.Link as={Link} to="/training/models">Mô hình</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;