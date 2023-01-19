import "./App.css";
import AppHeader from "../header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React, { useEffect } from "react";
import { fetchIngredients } from "../../utils/api";
import BurgerConstructorContext from "../../services/contexts";
import BURGER_API_URL from "../../config/api";

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [constructorIngredients, setConstructorIngredients] = React.useState(
    []
  );

  useEffect(() => {
    fetchIngredients(`${BURGER_API_URL}/ingredients`, setIngredients);
    setConstructorIngredients(
      [0, 2].map((key) => ingredients[key]).filter((it) => it !== undefined)
    );
  }, [ingredients]);

  return (
    <div className="App">
      <AppHeader />
      <div className="menu-container">
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructorContext.Provider value={constructorIngredients}>
          <BurgerConstructor />
        </BurgerConstructorContext.Provider>
      </div>
    </div>
  );
}

export default App;
