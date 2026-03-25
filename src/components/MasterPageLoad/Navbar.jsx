import { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LocalCarWashOutlinedIcon from "@mui/icons-material/LocalCarWashOutlined";
import { ServicesContext } from "../../context/ServicesContext";
import "./Navbar.css";

function Navbar({ setautenticated }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);
  const { setShow } = useContext(ServicesContext);

  const primaryLinks = useMemo(
    () => [
      {
        to: "/Home",
        label: "Dashboard",
        icon: <DashboardRoundedIcon fontSize="small" />,
      },
      {
        to: "/ListaCustomer",
        label: "Clientes",
        icon: <GroupsRoundedIcon fontSize="small" />,
      },
      {
        to: "/ListaPedidos",
        label: "Pedidos",
        icon: <AssignmentRoundedIcon fontSize="small" />,
      },
      {
        to: "/MapaLeaflet",
        label: "Mapa",
        icon: <MapRoundedIcon fontSize="small" />,
      },
      {
        to: "/ArticulosFaltantes",
        label: "Inventario",
        icon: <Inventory2RoundedIcon fontSize="small" />,
      },
    ],
    []
  );

  const adminLinks = useMemo(
    () => [
      {
        to: "/ListaUsuarios",
        label: "Lista de Usuarios",
      },
      {
        to: "/ListaRoles",
        label: "Lista de Roles",
      },
    ],
    []
  );

  const handleShow = () => {
    setShow(true);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setautenticated(false);
    navigate("/login");
  };

  const handleCloseMobileSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="dashboard-mobile-toggle d-lg-none"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Abrir menu lateral"
      >
        <MenuRoundedIcon />
      </button>

      <div
        className={`dashboard-sidebar-backdrop ${
          isSidebarOpen ? "show" : ""
        }`}
        onClick={handleCloseMobileSidebar}
      />

      <aside
        className={`dashboard-sidebar ${isSidebarOpen ? "open" : ""}`}
        aria-label="Navegacion principal"
      >
        <div className="dashboard-sidebar__brand">
          <div className="dashboard-sidebar__brand-icon">
            <LocalCarWashOutlinedIcon />
          </div>
          <div>
            <p className="dashboard-sidebar__eyebrow">Panel operativo</p>
            <h2>Lavadero</h2>
          </div>
        </div>

        <div className="dashboard-sidebar__section">
          <span className="dashboard-sidebar__section-title">Navegacion</span>

          <nav className="dashboard-sidebar__nav">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `dashboard-sidebar__link ${isActive ? "active" : ""}`
                }
                onClick={handleCloseMobileSidebar}
              >
                <span className="dashboard-sidebar__icon">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}

            <button
              type="button"
              className={`dashboard-sidebar__link dashboard-sidebar__link--button ${
                isUsersMenuOpen ? "active" : ""
              }`}
              onClick={() => setIsUsersMenuOpen((prev) => !prev)}
            >
              <span className="dashboard-sidebar__icon">
                <AdminPanelSettingsRoundedIcon fontSize="small" />
              </span>
              <span className="dashboard-sidebar__link-content">
                <span>Administracion</span>
                <KeyboardArrowDownRoundedIcon
                  className={`dashboard-sidebar__caret ${
                    isUsersMenuOpen ? "rotated" : ""
                  }`}
                  fontSize="small"
                />
              </span>
            </button>

            <div
              className={`dashboard-sidebar__subnav ${
                isUsersMenuOpen ? "open" : ""
              }`}
            >
              {adminLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `dashboard-sidebar__sublink ${isActive ? "active" : ""}`
                  }
                  onClick={handleCloseMobileSidebar}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>

        <div className="dashboard-sidebar__footer">
          <button
            type="button"
            className="dashboard-sidebar__action dashboard-sidebar__action--soft"
            onClick={handleShow}
          >
            <LockResetRoundedIcon fontSize="small" />
            <span>Cambio de clave</span>
          </button>

          <button
            type="button"
            className="dashboard-sidebar__action"
            onClick={handleLogout}
          >
            <LogoutRoundedIcon fontSize="small" />
            <span>Cerrar sesion</span>
          </button>
        </div>
      </aside>
    </>
  );
}

Navbar.propTypes = {
  setautenticated: PropTypes.func.isRequired,
};

export default Navbar;
