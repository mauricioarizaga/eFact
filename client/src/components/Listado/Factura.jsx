import React from "react";
import { Row, Col, Container } from "react-bootstrap";

export default function OneFactura(factura) {
  // a modo de ejemplo :)
  return (
    <Container>
      <div>
        <div>
          <h5>{factura.cliente}</h5>
        </div>
        <div>
          <h5>{factura.cuit}</h5>
        </div>
        <div>
          <h5>{factura.productos}</h5>
        </div>
        <div>
          <h5>{factura.cantidad}</h5>
        </div>
        <div>
          <h5>{factura.subtotal}</h5>
        </div>
        <h5>{factura.descuento}</h5>
        <div>
          <h5>{factura.total}</h5>
        </div>
      </div>
    </Container>
  );
}
