import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import modalStyles from "./modal.module.css";
import React from "react";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ header, onCloseClick, children }) => {
  const escFunction = React.useCallback((event) => {
    if (event.key === "Escape") {
      onCloseClick();
    }
  }, [onCloseClick]);

  React.useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onCloseClick={onCloseClick} />
      <div className={modalStyles.modal}>
        <div className={`${modalStyles.modalHeader} mt-10`}>
          <p className={`text text_type_main-large`}>{header}</p>
          <div className={modalStyles.modalClose}>
            <CloseIcon className="123" type="primary" onClick={onCloseClick} />
          </div>
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  header: PropTypes.string,
  onCloseClick: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};

const ModalOverlay = ({ onCloseClick }) => {
  return <div className={modalStyles.overlay} onClick={onCloseClick} />;
};

ModalOverlay.propTypes = {
  onCloseClick: PropTypes.func,
};

export { Modal, ModalOverlay };
