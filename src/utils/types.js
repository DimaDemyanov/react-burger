import PropTypes from "prop-types";

const INGREDIENT_TYPE = PropTypes.shape({
  type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  id: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  __v: PropTypes.number,
});

const INGREDIENTS_ARRAY_TYPE = PropTypes.arrayOf(INGREDIENT_TYPE).isRequired;

export { INGREDIENT_TYPE, INGREDIENTS_ARRAY_TYPE };
