import PropTypes from 'prop-types';

const INGREDIENT_TYPE = PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
});

const INGREDIENTS_ARRAY_TYPE = PropTypes.arrayOf(INGREDIENT_TYPE).isRequired;

export { INGREDIENT_TYPE, INGREDIENTS_ARRAY_TYPE };
