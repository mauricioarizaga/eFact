import React from "react";
import { Container, Navbar, Button, ButtonGroup } from "react-bootstrap";
import { IoIosPaperPlane } from "react-icons/io";
const NavBar = ({ getUser, usuario }) => {
  return (
    <Container id="conteinernavbar">
      <Navbar className="contenavbar">
        <ButtonGroup className="mr-2" aria-label="First group">
          <Button className="buttonSB" href="/" type="button">
            <IoIosPaperPlane size="10%" />
            Iniciar Sesión
          </Button>
          <Button className="buttonSB" href="/registrar" type="button">
            <IoIosPaperPlane size="10%" />
            Alta Usuario
          </Button>
          <Button className="buttonSB" href="/cargarfactura" type="button">
            <IoIosPaperPlane size="10%" />
            Cargar Factura
          </Button>
          <Button className="buttonSB" href="/listado" type="button">
            <IoIosPaperPlane size="10%" />
            Listado
          </Button>
        </ButtonGroup>
      </Navbar>
    </Container>
  );
};

export default NavBar;
