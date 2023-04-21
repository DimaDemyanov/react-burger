import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const  Constructor = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="menu-container">
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </DndProvider>
  );
}

export default Constructor;