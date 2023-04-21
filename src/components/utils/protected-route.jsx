import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRouteElement({ onlyUnAuth = false, children }) {
  const { isLoggedIn, user } = useSelector((store) => store.auth);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (!isLoggedIn && !onlyUnAuth) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to={from} />;
  }

  return children;
}

ProtectedRouteElement.propTypes = {
  onlyUnAuth: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default ProtectedRouteElement;
