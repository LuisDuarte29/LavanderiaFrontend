
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {NavLink,useNavigate} from 'react-router-dom'
const Navbar = ({setautenticated}) => {
  const navigate = useNavigate(); // Hook para la navegación
  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
    setautenticated(false);/* Aqui debo enviar la funcion de autenticacion para que el navbar se pueda modificar al hacer logout*/
    navigate("/login"); // Redirige a la página de inicio de sesión
    console.log("Logout exitoso"); // Mensaje de éxito en la consola
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">My Landing Page</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
<NavLink className="nav-link" to="/ListaPedidos">Lista Pedidos</NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/ListaCustomer">Lista Customers</NavLink>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
