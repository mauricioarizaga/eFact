import React from "react";
import { Container, Navbar, Button, ButtonGroup } from "react-bootstrap";
import { IoIosPaperPlane } from "react-icons/io";
const NaLog = () => {
  return (
    <Container id="conteinernavbar">
      <Navbar className="contenavbar">
        <ButtonGroup className="mr-2" aria-label="First group">
          <Button className="buttonSB" href="/cargarfactura" type="button">
            Cargar Factura
          </Button>
          <Button className="buttonSB" href="/listado" type="button">
            Listado
          </Button>
        </ButtonGroup>
      </Navbar>
    </Container>
  );
};
export default NaLog;
