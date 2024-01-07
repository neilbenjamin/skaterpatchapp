import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import { Navbar, Nav, Container, NavItem } from 'react-bootstrap';

function SkaterDashboard({ onLogout }) {
  const [expanded, setExpanded] = useState(false);

  const closeMenu = () => setExpanded(false);

  return (
    <Navbar collapseOnSelect expanded={expanded} expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/skater/home">Skater Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavItem>
              <Nav.Link as={NavLink} to="/skater/profile" onClick={closeMenu}>Profile</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={NavLink} to="/skater/update-profile" onClick={closeMenu}>Update Profile</Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={NavLink} to="/skater/contact" onClick={closeMenu}>Contact</Nav.Link>
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
