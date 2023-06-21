import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals")!;

export interface IModalProps {
  header?: string;
  onCloseClick: () => void;
  children?: React.ReactNode;
}

const Modal: FC<IModalProps> = ({ header, onCloseClick, children }) => {
  const escFunction = React.useCallback<(e: KeyboardEvent) => void>(
    (event) => {
      if (event.key === "Escape") {
        onCloseClick();
      }
    },
    [onCloseClick]
  );

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
          <p className={`text text_type_main-large`}>{header ?? ""}</p>
          <div className={modalStyles.modalClose} data-cy="close-modal">
            <CloseIcon type="primary" onClick={onCloseClick} />
          </div>
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

const ModalOverlay = ({ onCloseClick }: { onCloseClick: () => void }) => {
  return <div className={modalStyles.overlay} onClick={onCloseClick} data-cy="modal-overlay" />;
};

export { Modal, ModalOverlay };
