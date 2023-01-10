import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../common/modal";
import constructorStyles from './burger-constructor.module.css';

const OrderDetails = (props) => {
    return (
        <Modal {...props}>
            <p className="text text_type_digits-large mt-4">034536</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            <div className={`${constructorStyles.modalCheckMark} mt-15`}>
                <CheckMarkIcon type="primary" />
            </div>
            <p className="text text_type_main-small mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
        </Modal>
    );
};

OrderDetails.propTypes = Modal.propTypes;

export default OrderDetails;