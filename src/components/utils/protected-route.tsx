import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/store";

interface IProtectedRouteElement {
  onlyUnAuth: boolean;
  children: React.ReactNode;
}

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({
  onlyUnAuth = false,
  children,
}) => {
  const { isLoggedIn, user } = useAppSelector((store) => store.auth);
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
