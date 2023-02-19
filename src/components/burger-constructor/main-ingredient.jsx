import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import {
  MOVE_INGREDIENT,
  REMOVE_CONSTRUCTOR_INGREDIENT,
} from "../../services/actions";
import { INGREDIENT_TYPE } from "../../utils/types";
import constructorStyles from "./burger-constructor.module.css";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const MainIngredient = ({ ingredient, index }) => {
  const dispatch = useDispatch();

  // Следующий код взят по сыллку от куратора из https://codesandbox.io/embed/react-dnd-rtk-ofjc4h?codemirror=1 и адаптирован под текущий проект
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ["filling"],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      // Индекс перемещаемого элемента
      const dragIndex = item.index;
      // Индекс текущего элемента (над которым находится курсор при dnd)
      const hoverIndex = index;

      // Выходим, если индексы сопадают
      if (dragIndex === hoverIndex) {
        return;
      }

      // Получаем положение текущего элемента относительно экрана
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Получаем центр текущего элемента по вертикали
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Получаем положение курсора
      const clientOffset = monitor.getClientOffset();
      // Получаем положение курсора относительно текущего элемента
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Выходим, если перемещаемый элемент ниже, чем 50% от высоты текущего
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Выходим, если перемещаемый элемент выше, чем 50% от высоты текущего
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({ type: MOVE_INGREDIENT, from: dragIndex, to: hoverIndex });

      // Сразу меняем индекс перемещаемого элемента
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "filling",
    item: () => {
      // Определяем элемент
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      className={`${constructorStyles.ingredient} mb-4`}
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        extraClass="ml-2"
        handleClose={() =>
          dispatch({
            type: REMOVE_CONSTRUCTOR_INGREDIENT,
            ingredient: ingredient,
          })
        }
      />
    </div>
  );
};

MainIngredient.propTypes = {
  ingredient: INGREDIENT_TYPE.isRequired,
};

export default MainIngredient;
