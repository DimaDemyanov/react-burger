import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ingredientStyles from "./burger-ingredients.module.css";
import IngredientsGroup from "./ingredient-group";

const IngredientTabs = () => {
  const [current, setCurrent] = React.useState("Buns");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].target.id === "bun_tab_header") {
            setCurrent("Buns");
          } else if (entries[i].target.id === "main_tab_header") {
            setCurrent("Sauces");
          } else if (entries[i].target.id === "sauce_tab_header") {
            setCurrent("Filling");
          }
        }
      },
      { root: document.getElementById("scrollable_box") }
    );
    observer.observe(document.getElementById("bun_tab_header"));
    observer.observe(document.getElementById("main_tab_header"));
    observer.observe(document.getElementById("sauce_tab_header"));
  }, []);

  return (
    <div className={`${ingredientStyles.tabs} mt-5`}>
      <Tab value="Buns" active={current === "Buns"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Sauces" active={current === "Sauces"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Filling" active={current === "Filling"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};

const BurgerIngredients = () => {
  const ingredients = useSelector(state => state.ingredients);
  

  return (
    <section className={ingredientStyles.container}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <IngredientTabs />
      <div className={`${ingredientStyles.allIngredients}  custom-scroll`}>
        <IngredientsGroup
          type={"bun"}
          ingredients={ingredients.filter((it) => it.type === "bun")}
          key={0}
        />
        <IngredientsGroup
          type={"sauce"}
          ingredients={ingredients.filter((it) => it.type === "sauce")}
          key={1}
        />
        <IngredientsGroup
          type={"main"}
          ingredients={ingredients.filter((it) => it.type === "main")}
          key={2}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
