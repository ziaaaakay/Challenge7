import React, { Fragment, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NavbarDefault.scss";

export const NavbarDefault = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("accountData") !== null
  );
  const [accountData, setAccountData] = useState(
    JSON.parse(localStorage.getItem("accountData"))
  );

  const handleLogout = () => {
    localStorage.removeItem("accountData");
    localStorage.removeItem("accessToken");

    navigate("/login");
  };

  return (
    <Navbar variant="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand onClick={() => navigate(`/`)}></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          className="justify-content-end align-items-center"
        >
          <Nav className="align-items-center">
            <Nav.Link href="#our-services">Our Services</Nav.Link>
            <Nav.Link href="#why-us">Why Us</Nav.Link>
            <Nav.Link href="#testimonial">Testimonial</Nav.Link>
            <Nav.Link href="#faq">FAQ</Nav.Link>
            {loggedIn ? (
              <Fragment>
                <Nav.Link href="/dashboard" disabled>
                  {accountData?.email}
                </Nav.Link>
                <Button variant="success" onClick={handleLogout}>
                  Logout
                </Button>
              </Fragment>
            ) : (
              <>
                <Nav.Link href="/login">
                  <Button variant="success">Login</Button>
                </Nav.Link>
                <Nav.Link href="/register">
                  <Button variant="success">Register</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
