import { Modal } from "../common/modal";
import constructorStyles from "./burger-constructor.module.css";
import PropTypes from "prop-types";

const OrderDetails = (props) => {
  return (
    <Modal {...props}>
      <>
        <p className="text text_type_digits-large mt-4">{props.orderNumber}</p>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
        <div className={`${constructorStyles.modalCheckMark} mt-15`}></div>
        <p className="text text_type_main-small mt-15">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-small text_color_inactive mt-2 mb-30">
          Дождитесь готовности на орбитальной станции
        </p>
      </>
    </Modal>
  );
};

OrderDetails.propTypes = {
  ...Modal.propTypes,
  orderNumber: PropTypes.string.isRequired,
};

export default OrderDetails;
