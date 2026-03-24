import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

function ProtectedRoute({ isAuthenticated, onLogout, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthenticatedLayout onLogout={onLogout}>{children}</AuthenticatedLayout>
  );
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
