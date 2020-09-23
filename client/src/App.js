import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AltaUsuario from "./components/Cliente/FormularioAltaCliente.jsx";
import Login from "./components/Usuario/LoginForm.jsx";
import CargaFactura from "./components/CargaFactura/CargaFactura.jsx";
import Listado from "./components/Listado/Listado.jsx";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/registrar" component={AltaUsuario} />
          <Route exact path="/" component={Login} />
          <Route exact path="/listado" component={Listado} />
          <Route exact path="/cargarfactura" component={CargaFactura} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
