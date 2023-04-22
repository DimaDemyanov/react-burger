import AppHeader from "../header/app-header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IngredientDetails from "../burger-ingredients/ingredient-details";
import { getIngredients } from "../../services/actions/ingredients";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { ForgotPassword } from "../pages/forgot-password";
import { ResetPassword } from "../pages/reset-password";
import { Profile } from "../pages/profile";
import { getUser } from "../../services/actions/auth";
import Constructor from "../pages/constructor";
import { NotFound } from "../pages/not-found";
import ProtectedRouteElement from "../utils/protected-route";
import { ProfileInfo } from "../profile-info/profile-info";
import { Modal } from "../common/modal";
import "./app.css";
import Preloader from "../preloader/preloader";
import { ProfileOrders } from "../profile-orders/profile-orders";
import { AppDispatch, RootState } from "../..";

function App() {
  const authChecked = useSelector<RootState>(state => state.auth.authChecked);

  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const closeIngredientDetails = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (authChecked) {
      setLoading(false);
    }
  }, [authChecked]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className="App">
          <AppHeader />

          <div className="main">
            <Routes location={background || location}>
              <Route path="/" element={<Constructor />} />
              <Route
                path="/login"
                element={
                  <ProtectedRouteElement onlyUnAuth={true}>
                    <Login />
                  </ProtectedRouteElement>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedRouteElement onlyUnAuth={true}>
                    <Register />
                  </ProtectedRouteElement>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <ProtectedRouteElement onlyUnAuth={true}>
                    <ForgotPassword />
                  </ProtectedRouteElement>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <ProtectedRouteElement onlyUnAuth={true}>
                    <ResetPassword />
                  </ProtectedRouteElement>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRouteElement onlyUnAuth={false}>
                    <Profile />
                  </ProtectedRouteElement>
                }
              >
                <Route index element={<ProfileInfo />} />
                <Route path="orders" element={<ProfileOrders />} />
              </Route>
              <Route path="/ingredients/:id" element={<IngredientDetails />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            {background && (
              <Routes>
                <Route
                  path="/ingredients/:id"
                  element={
                    <Modal
                      onCloseClick={closeIngredientDetails}
                      header={"Детали ингредиента"}
                    >
                      <IngredientDetails />
                    </Modal>
                  }
                />
              </Routes>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
