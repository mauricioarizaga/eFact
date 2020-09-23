import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, FormControl, Container } from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom";
import { registrarUsuario } from "../../actions/UserActions";
import swal from "sweetalert2";

export default function RegistroUsuario() {
  const dispatch = useDispatch();
  const history = useHistory();
  var [fullName, setNombre] = useState("");
  var [email, setEmail] = useState();
  var [password, setPassword] = useState();
  var [idNumber, setIdNumber] = useState();
  var [phone, setPhone] = useState();

  var usuario = {
    fullName,
    email,
    password,
    idNumber,
    phone,
  };

  function handleSubmit() {
    dispatch(registrarUsuario(usuario));
    swal.fire({
      title: "Bienvenido a I-Factura",
      icon: "success",
    });
    let path = `/`;
    history.push(path);
  }

  return (
    <Container>
      <NavBar />
      <h3 align="center">Alta Cliente</h3>
      <Form onSubmit={(e) => handleSubmit()}>
        <h5 align="center">Nombre y Apellido:</h5>
        <FormControl
          required
          type="text"
          value={fullName}
          onChange={(e) => setNombre(e.target.value)}
        />

        <h5 align="center">DNI:</h5>
        <FormControl
          required
          type="text"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
        />

        <h5 align="center">Telefono:</h5>
        <FormControl
          required
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <h5 align="center">Email:</h5>
        <FormControl
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <h5 align="center">Password:</h5>
        <FormControl
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="success">
          Crear Cuenta
        </Button>
      </Form>
    </Container>
  );
}
