import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, RefObject, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ingredientStyles from "./burger-ingredients.module.css";
import IngredientsGroup, { Type } from "./ingredient-group";
import { RootState } from "../..";
import { TIngredient } from "../../utils/types";

interface IIngredientTabs {
  refs: { bunHeaderRef: RefObject<HTMLDivElement>, sauceHeaderRef: RefObject<HTMLDivElement | undefined>, mainHeaderRef: RefObject<HTMLDivElement | undefined>}
}

const IngredientTabs: FC<IIngredientTabs> = ({
  refs: { bunHeaderRef, sauceHeaderRef, mainHeaderRef },
}) => {
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
    observer.observe(bunHeaderRef.current!);
    observer.observe(sauceHeaderRef.current!);
    observer.observe(mainHeaderRef.current!);
  }, [bunHeaderRef, sauceHeaderRef, mainHeaderRef]);

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
  const ingredients: ReadonlyArray<TIngredient> = useSelector<RootState, ReadonlyArray<TIngredient>>((state) => state.ingredients);

  const bunHeaderRef = useRef<HTMLDivElement>(null);
  const sauceHeaderRef = useRef<HTMLDivElement>(null);
  const mainHeaderRef = useRef<HTMLDivElement>(null);

  return (
    <section className={ingredientStyles.container}>
      <p className="text text_type_main-large mt-10">Соберите бургер</p>
      <IngredientTabs refs={{ bunHeaderRef, sauceHeaderRef, mainHeaderRef }} />
      <div className={`${ingredientStyles.allIngredients}  custom-scroll`}>
        <IngredientsGroup
          type={Type.Bun}
          ingredients={ingredients.filter((it) => it.type === "bun")}
          tabRef={bunHeaderRef}
          key={0}
        />
        <IngredientsGroup
          type={Type.Sauce}
          ingredients={ingredients.filter((it) => it.type === "sauce")}
          tabRef={sauceHeaderRef}
          key={1}
        />
        <IngredientsGroup
          type={Type.Main}
          ingredients={ingredients.filter((it) => it.type === "main")}
          tabRef={mainHeaderRef}
          key={2}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
