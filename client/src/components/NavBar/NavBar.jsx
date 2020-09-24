import React from "react";
import { Container, Navbar, Button, ButtonGroup } from "react-bootstrap";

const NavBar = () => {
  return (
    <Container id="conteinernavbar">
      <Navbar className="contenavbar">
        <ButtonGroup className="mr-2" aria-label="First group">
          <Button className="buttonSB" href="/" type="button">
            Iniciar Sesión
          </Button>
          <Button className="buttonSB" href="/registrar" type="button">
            Alta Usuario
          </Button>
        </ButtonGroup>
      </Navbar>
    </Container>
  );
};

export default NavBar;
