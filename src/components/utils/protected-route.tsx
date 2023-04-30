import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../services/store";

interface IProtectedRouteElement {
  onlyUnAuth: boolean;
  children: React.ReactNode;
}

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({
  onlyUnAuth = false,
  children,
}) => {
  const { isLoggedIn, user } = useSelector<
    RootState,
    { isLoggedIn: boolean; user: any }
  >((store) => store.auth);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (!isLoggedIn && !onlyUnAuth) {
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to={from} />;
  }

  return <>{children}</>;
};

export default ProtectedRouteElement;
