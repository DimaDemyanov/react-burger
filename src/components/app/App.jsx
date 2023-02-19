import "./App.css";
import AppHeader from "../header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect } from "react";
import BURGER_API_URL from "../../config/api";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients, HIDE_INGREDIENT_DETAILS } from "../../services/actions";
import IngredientDetails from "../burger-ingredients/ingredient-details";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const { ingredients, shownIngredient } = useSelector((state) => state);
  const dispatch = useDispatch();

  const closeIngredientDetails = () => {
    dispatch({
      type: HIDE_INGREDIENT_DETAILS
    })
  };
  

  useEffect(() => {
    dispatch(getIngredients(`${BURGER_API_URL}/ingredients`));
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <div className="menu-container">
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor />
        </div>
      </DndProvider>
      {shownIngredient !== null && (
        <IngredientDetails
          header="Детали ингредиента"
          onCloseClick={closeIngredientDetails}
          ingredient={shownIngredient}
        />
      )}
    </div>
  );
}

export default App;
