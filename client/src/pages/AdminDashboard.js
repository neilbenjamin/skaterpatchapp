import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { Navbar, Nav, Container, NavItem } from 'react-bootstrap';

function AdminDashboard({ onLogout }) {
  const [expanded, setExpanded] = useState(false);

  const closeMenu = () => setExpanded(false);

  return (
    <Navbar collapseOnSelect expanded={expanded} expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/admin/home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavItem>
              <Nav.Link as={NavLink} to="/admin/profile" onClick={closeMenu}>Skater Profile</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={NavLink} to="/admin/update-patchcard" onClick={closeMenu}>Patch Card</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={NavLink} to="/admin/new-user" onClick={closeMenu}>Update Skater</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={NavLink} to="/admin/admin-update" onClick={closeMenu}>Update Admin</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={NavLink} to="/admin/contact" onClick={closeMenu}>Contact</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={NavLink} to="/admin/test" onClick={closeMenu}>Test</Nav.Link>
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
