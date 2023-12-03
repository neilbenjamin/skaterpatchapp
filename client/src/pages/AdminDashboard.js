import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { Navbar, Nav, Container, NavItem } from 'react-bootstrap';

function AdminDashboard({ onLogout }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/admin/home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavItem>
              <Nav.Link as={NavLink} to="/admin/new-user">Update User</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={NavLink} to="/admin/profile">User Profile</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={NavLink} to="/admin/contact">Contact</Nav.Link>
            </NavItem>
          </Nav>
          <Nav>
            <LogoutButton onLogout={onLogout} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminDashboard;
