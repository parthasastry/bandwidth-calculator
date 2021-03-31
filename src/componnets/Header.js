import React from "react";
import { Navbar, Nav, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Bandwidth Calculator</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <LinkContainer to="/" className="text-white">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/calculator" className="text-white">
            <Nav.Link>Calculator</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about" className="text-white">
            <Nav.Link>About</Nav.Link>
          </LinkContainer>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
