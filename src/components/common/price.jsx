import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import priceStyles from './price.module.css';

const Price = ({ price, textSize = 'default' }) => {
    return (
        <div className={`${priceStyles.price}`}>
            <p className={`text text_type_digits-${textSize}`}>{price}</p>
            <div className="ml-1">
                <CurrencyIcon type="primary" />
            </div>
        </div>
    );
}

Price.propTypes = {
    price: PropTypes.number.isRequired,
    textSize: PropTypes.oneOf(["default", "small", "medium", "large"])
};

export default Price;