import PropTypes from "prop-types";
import Navbar from "../../components/MasterPageLoad/Navbar";

function AuthenticatedLayout({ onLogout, children }) {
  return (
    <>
      <Navbar setautenticated={onLogout} />
      {children}
    </>
  );
}

export default AuthenticatedLayout;

AuthenticatedLayout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
