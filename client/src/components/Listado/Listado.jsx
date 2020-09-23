import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Form, Button, Col, FormControl, Container } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom";
import { listarFacturas, getUser } from "../../actions/UserActions";
import swal from "sweetalert2";

export function Listado({
  getUser,
  usuarioConectado,
  listarFacturas,
  usuario,
  listado,
}) {
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (usuario.usuarioConectado.id) {
      listarFacturas(usuario.usuarioConectado.id);
    }
  }, [usuario.usuarioConectado]);

  console.log(listado);
  console.log(usuarioConectado.id);
  return (
    <Container>
      <NavBar />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    usuario: state.usuario,
    listado: state.usuario.listado,
    usuarioConectado: state.usuario.usuarioConectado,
  };
}

export default connect(mapStateToProps, {
  getUser,
  listarFacturas,
})(Listado);
