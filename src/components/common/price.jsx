import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Price = ({price, textSize = 'default'}) => {
    return <div style={{display: "flex", alignItems: 'center'}}>
        <p className={"text text_type_digits-" + textSize}>{price}</p>
        <div className="ml-1">
            <CurrencyIcon type="primary" />
        </div>
    </div>
}

export default Price;