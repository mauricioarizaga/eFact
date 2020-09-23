import {
  AGREGAR_USER,
  CARGAR_FACTURA,
  LISTADO,
  GET_USER,
} from "../constants/userConstants";

const initialState = {
  usuarios: [],
  usuarioConectado: {},
  facturas: [],
  listado: [{}],
};

export default function usuario(state = initialState, action) {
  switch (action.type) {
    case AGREGAR_USER:
      return {
        ...state,
        usuarios: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        usuarioConectado: action.payload,
      };
    case CARGAR_FACTURA:
      return {
        ...state,
        facturas: action.payload,
      };

    case LISTADO:
      return {
        ...state,
        listado: action.payload,
      };
    default:
      return state;
  }
}
