import PropTypes from "prop-types";
import Navbar from "../../components/MasterPageLoad/Navbar";
import "./AuthenticatedLayout.css";

function AuthenticatedLayout({ onLogout, children }) {
  return (
    <div className="dashboard-layout">
      <Navbar setautenticated={onLogout} />
      <main className="dashboard-layout__content">{children}</main>
    </div>
  );
}

export default AuthenticatedLayout;

AuthenticatedLayout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
