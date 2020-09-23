import {
  AGREGAR_USER,
  CARGAR_FACTURA,
  GET_USER,
  LISTADO,
} from "../constants/userConstants";
import axios from "axios";
import swal from "sweetalert2";

export function registrarUsuario(user) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/users/new", user)
      .then((value) => {
        dispatch({ type: AGREGAR_USER });
      })
      .catch(() => {
        swal.fire({
          title: "¡Qué mal!",
          text: "E-mail " + user.email + " ya está en uso",
          icon: "error",
        });
      });
  };
}

export function getUser() {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/auth/perfil", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          return dispatch({ type: GET_USER, payload: res.data });
        }
      });
  };
}

export function LoginUser(usuario, setUsuario) {
  axios
    .post(
      "http://localhost:3001/auth/login",
      {
        email: usuario.email,
        password: usuario.password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      const user = res.data;

      if (user) {
        swal.fire("Éxito", "Bienvenido " + user.fullName, "success");
        setUsuario({
          redirectTo: "/cargarfactura",
        });
      } else {
        swal.fire(
          "Error",
          "Usuario y/o contraseña incorrectos. Intente nuevamente",
          "error"
        );
      }
    })
    .catch((e) => {
      swal.fire(
        "Error",
        "Ha ocurrido un error al iniciar sesión. Intente nuevamente",
        "error"
      );
    });
}

export function cargaFactura(factura) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/facturas/new", factura)
      .then((value) => {
        dispatch({ type: CARGAR_FACTURA });
      })
      .catch(() => {
        swal.fire({
          title: "¡Qué mal!",
          text: "No se ha podido cargar la factura",
          icon: "error",
        });
      });
  };
}
export function listarFacturas(id) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/facturas/${id}`)
      .then((result) => {
        return dispatch({ type: LISTADO, payload: result.data });
      })
      .catch(() => {
        swal.fire({
          title: "¡Qué mal!",
          text: "No se ha podido cargar el listado",
          icon: "error",
        });
      });
  };
}
