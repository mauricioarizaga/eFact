import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { listarFacturas, getUser } from "../../actions/UserActions";
import {
  Container,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(2, 0, 1),
  },
}));
export function Listado({
  getUser,
  usuarioConectado,
  listarFacturas,
  usuario,
  listado,
}) {
  const classes = useStyles();
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (usuario.usuarioConectado.id) {
      listarFacturas(usuario.usuarioConectado.id);
    }
  }, [usuario.usuarioConectado]);

  return (
    <Container>
      <NavBar />
      <div>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="right">CLIENTE</TableCell>
                <TableCell align="right">CUIT</TableCell>
                <TableCell align="right">CANTIDAD</TableCell>
                <TableCell align="right">PRODUCTO/SERVICIO</TableCell>
                <TableCell align="right">SUBTOTAL</TableCell>
                <TableCell align="right">DESCUENTOS</TableCell>
                <TableCell align="right">TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listado &&
                listado.reverse().map((e) => (
                  <TableRow key={e.id}>
                    <TableCell align="right">{e.cliente}</TableCell>
                    <TableCell align="right">{e.cuit}</TableCell>
                    <TableCell align="right">{e.cantidad}</TableCell>
                    <TableCell align="right">{e.productos}</TableCell>
                    <TableCell align="right">{e.subtotal}</TableCell>
                    <TableCell align="right">{e.descuento}</TableCell>
                    <TableCell align="right">{e.total}</TableCell>

                    <TableCell align="right"></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
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
