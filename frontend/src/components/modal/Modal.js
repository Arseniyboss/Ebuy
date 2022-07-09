import { useEffect, useRef, useCallback } from "react";
import {
  ModalWrapper,
  ModalContainer,
  ModalHeading,
  ModalText,
  Cross,
} from "./Styles";

const Modal = ({ setSuccess }) => {
  const modalRef = useRef();

  const closeModal = useCallback(() => {
    setSuccess(false);
  }, [setSuccess]);

  const closeModalOnOutside = (e) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  };

  const closeModalOnKeyPress = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeModalOnKeyPress);
    return () => document.removeEventListener("keydown", closeModalOnKeyPress);
  }, [closeModalOnKeyPress]);
  return (
    <ModalWrapper ref={modalRef} onClick={closeModalOnOutside}>
      <ModalContainer>
        <ModalHeading>Thanks for contacting us!</ModalHeading>
        <ModalText>We will reply ASAP</ModalText>
        <Cross onClick={closeModal} />
      </ModalContainer>
    </ModalWrapper>
  );
};

export default Modal;
