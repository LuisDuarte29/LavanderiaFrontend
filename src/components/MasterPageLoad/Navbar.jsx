import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { NavLink, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../Utils/ColorModelconDropdown";
import { useContext } from "react";
import { ServicesContext } from "../../context/ServicesContext";
import ContainerReact from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarReact from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.8)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function Navbar({ setautenticated }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { show, setShow } = useContext(ServicesContext);

  const handleShow = () => setShow(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setautenticated(false);
    navigate("/login");
    console.log("Logout exitoso");
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="absolute"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 10px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar
          variant="dense"
          style={{ backgroundColor: "white", opacity: 0.9 }}
          disableGutters
        >
          <Box
            sx={{
              flexGrow: 1,
              color: "text.primary",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              px: 0,
            }}
          >
            {/* Aquí podrías poner tu logo o marca */}
            <NavLink
              to="/Home"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                component="span"
                sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
              >
                Lavadero
              </Box>
            </NavLink>
            {/* Menú para pantallas md+ */}
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 4, gap: 2 }}>
              <Button
                component={NavLink}
                to="/ListaCustomer"
                variant="text"
                color="success"
                size="small"
              >
                Lista Clientes
              </Button>
              <Button
                component={NavLink}
                to="/ListaPedidos"
                variant="text"
                color="error"
                size="small"
                sx={{ minWidth: 0 }}
              >
                Lista Pedidos
              </Button>
              <Button
                component={NavLink}
                to="/ArticulosFaltantes"
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                Articulos Faltantes
              </Button>
              <Button
                onClick={handleShow}
                variant="text"
                size="small"
                color="warning"
                sx={{ minWidth: 0 }}
              >
                Cambio de Clave
              </Button>
              <NavbarReact bg="light" expand="lg">
                <ContainerReact>
                  <NavbarReact.Toggle aria-controls="basic-navbar-nav" />
                  <NavbarReact.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      <NavDropdown title="Usuarios" id="basic-nav-dropdown">
                        <NavDropdown.Item as={NavLink} to="/ListaUsuarios">
                          <Box
                            component="span"
                            sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
                          >
                            Lista de Usuarios
                          </Box>
                        </NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/ListaRoles">
                          <Box
                            component="span"
                            sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
                          >
                            Lista de Roles
                          </Box>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </NavbarReact.Collapse>
                </ContainerReact>
              </NavbarReact>
            </Box>
          </Box>

          {/* Botones de autenticación + selector de modo (md+) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {!localStorage.getItem("token") ? (
              <>
                <Button
                  component={NavLink}
                  to="/login"
                  color="primary"
                  variant="text"
                  size="small"
                >
                  Sign in
                </Button>
                <Button
                  component={NavLink}
                  to="/signup"
                  color="primary"
                  variant="contained"
                  size="small"
                >
                  Sign up
                </Button>
                <ColorModeIconDropdown />
              </>
            ) : (
              <Button
                onClick={handleLogout}
                color="primary"
                variant="outlined"
                size="small"
              >
                Sign out
              </Button>
            )}
          </Box>

          {/* Iconos y menú hamburguesa (xs) */}
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <IconButton
              aria-label="Menú"
              onClick={toggleDrawer(true)}
            ></IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.paper" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                {!localStorage.getItem("token") ? (
                  <>
                    <MenuItem>
                      <Button
                        component={NavLink}
                        to="/signup"
                        color="primary"
                        variant="contained"
                        fullWidth
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        component={NavLink}
                        to="/login"
                        color="primary"
                        variant="outlined"
                        fullWidth
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem>
                    <Button
                      onClick={handleLogout}
                      color="primary"
                      variant="outlined"
                      fullWidth
                    >
                      Sign out
                    </Button>
                  </MenuItem>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
