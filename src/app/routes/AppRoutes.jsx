import PropTypes from "prop-types";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Lazy } from "../../LazyCarga/Lazy";
import ProtectedRoute from "./ProtectedRoute";
import { privateRoutes, publicRoutes } from "./routeConfig";

function renderRouteComponent(Component, props) {
  return (
    <Suspense fallback={<Lazy />}>
      <Component {...props} />
    </Suspense>
  );
}

function AppRoutes({ isAuthenticated, setIsAuthenticated, handleLogin }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {publicRoutes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            isAuthenticated ? (
              <Navigate to="/Home" replace />
            ) : (
              renderRouteComponent(Component, { onLogin: handleLogin })
            )
          }
        />
      ))}

      {privateRoutes.map(
        ({ path, component: Component, passIsAuthenticated, extraProps }) => {
          const routeProps = {
            ...(passIsAuthenticated ? { isAuthenticated } : {}),
            ...(extraProps
              ? extraProps({ isAuthenticated, setIsAuthenticated })
              : {}),
          };

          return (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  onLogout={setIsAuthenticated}
                >
                  {renderRouteComponent(Component, routeProps)}
                </ProtectedRoute>
              }
            />
          );
        }
      )}
    </Routes>
  );
}

export default AppRoutes;

AppRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};
