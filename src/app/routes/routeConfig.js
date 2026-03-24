import ArticulosFaltantes from "../../components/Inventario/ArticulosFaltantes";
import { LazyLoaders } from "../../LazyCarga/LazyLoaders";

const ListaCustomerPage = LazyLoaders("Customers/ListaCustomer");
const CreateUsuarioPage = LazyLoaders("Usuarios/CreateUsuarios");
const ListaPedidosPage = LazyLoaders("Pedidos/ListaPedidos");
const ListaUsuariosPage = LazyLoaders("Usuarios/ListaUsuarios");
const CreatePedidosPage = LazyLoaders("Pedidos/CreatePedidos");
const CreateCustomerPage = LazyLoaders("Customers/CreateCustomer");
const AsignarPermisosRolesPage = LazyLoaders("Roles/AsignarPermisosRoles");
const ListaRolesPage = LazyLoaders("Roles/ListaRoles");
const LoginPage = LazyLoaders("Login/LoginForm");
const DetalleFotosPage = LazyLoaders("Pedidos/PedidosVer/DetallesFotos");
const MapLeafletPage = LazyLoaders("Direccion/MapaLeaflet");
const EstadisticaPage = LazyLoaders("Estadisitica/TipoLavado");

export const publicRoutes = [
  {
    path: "/login",
    component: LoginPage,
  },
];

export const privateRoutes = [
  {
    path: "/Home",
    component: EstadisticaPage,
  },
  {
    path: "/ListaUsuarios",
    component: ListaUsuariosPage,
    passIsAuthenticated: true,
  },
  {
    path: "/ListaRoles",
    component: ListaRolesPage,
    passIsAuthenticated: true,
  },
  {
    path: "/ListaPedidos",
    component: ListaPedidosPage,
    passIsAuthenticated: true,
  },
  {
    path: "/CreatePedidos",
    component: CreatePedidosPage,
    passIsAuthenticated: true,
  },
  {
    path: "/CreatePedidos/:appointmentId",
    component: CreatePedidosPage,
    passIsAuthenticated: true,
  },
  {
    path: "/DetallesFotos/:appointmentId",
    component: DetalleFotosPage,
  },
  {
    path: "/ListaCustomer",
    component: ListaCustomerPage,
    passIsAuthenticated: true,
  },
  {
    path: "/MapaLeaflet",
    component: MapLeafletPage,
  },
  {
    path: "/CreateCustomer",
    component: CreateCustomerPage,
  },
  {
    path: "/ArticulosFaltantes",
    component: ArticulosFaltantes,
  },
  {
    path: "/AsignarPermisosRoles/:rolId/:rolName",
    component: AsignarPermisosRolesPage,
    extraProps: ({ setIsAuthenticated }) => ({
      setIsAuthenticated,
    }),
  },
  {
    path: "/CreateUsuarios",
    component: CreateUsuarioPage,
    extraProps: ({ setIsAuthenticated }) => ({
      setautenticated: setIsAuthenticated,
    }),
  },
];
