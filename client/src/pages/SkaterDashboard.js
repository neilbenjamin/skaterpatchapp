import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { Navbar, Nav, Container, NavItem } from 'react-bootstrap';

function SkaterDashboard({ onLogout }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/skater/home">Skater Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavItem>
              <Nav.Link as={NavLink} to="/skater/profile">Profile</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={NavLink} to="/skater/contact">Contact</Nav.Link>
            </NavItem>
            {/* Insert other navigation links if necessary */}
          </Nav>
          <Nav>
            <LogoutButton onLogout={onLogout} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SkaterDashboard;
