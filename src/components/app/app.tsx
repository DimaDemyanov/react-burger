import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../services/actions/auth";
import { getIngredients } from "../../services/actions/ingredients";
import { AppDispatch, RootState } from "../../services/store";
import IngredientDetails from "../burger-ingredients/ingredient-details";
import { Modal } from "../common/modal";
import AppHeader from "../header/app-header";
import Constructor from "../pages/constructor";
import { FeedPage } from "../pages/feed";
import { FeedOrderDetails } from "../pages/feed-order-details";
import { ForgotPassword } from "../pages/forgot-password";
import { Login } from "../pages/login";
import { NotFound } from "../pages/not-found";
import { Profile } from "../pages/profile";
import { Register } from "../pages/register";
import { ResetPassword } from "../pages/reset-password";
import Preloader from "../preloader/preloader";
import { ProfileInfo } from "../profile-info/profile-info";
import { ProfileOrders } from "../profile-orders/profile-orders";
import ProtectedRouteElement from "../utils/protected-route";
import "./app.css";

function App() {
  const authChecked = useSelector<RootState>((state) => state.auth.authChecked);

  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const onModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

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
              <Route path="/feed" element={<FeedPage />} />
              <Route
                path="/feed/:id"
                element={<FeedOrderDetails isProfileOrder={false} />}
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
                <Route
                  path="orders/:id"
                  element={
                    <ProtectedRouteElement onlyUnAuth={false}>
                      <FeedOrderDetails isProfileOrder={true} />
                    </ProtectedRouteElement>
                  }
                />
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
                      onCloseClick={onModalClose}
                      header={"Детали ингредиента"}
                    >
                      <IngredientDetails />
                    </Modal>
                  }
                />
                <Route
                  path="/feed/:id"
                  element={
                    <Modal
                      onCloseClick={onModalClose}
                      // showId={true}
                      // isProfileOrder={false}
                    >
                      <FeedOrderDetails isProfileOrder={true} />
                    </Modal>
                  }
                />
                <Route
                  path="/profile/orders/:id"
                  element={
                    <Modal
                      onCloseClick={onModalClose}
                      // showId={true}
                      // isProfileOrder={true}
                    >
                      <ProtectedRouteElement onlyUnAuth={false}>
                        <FeedOrderDetails isProfileOrder={true} />
                      </ProtectedRouteElement>
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
