import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const GenericModal = (props) => {
  const { modalOpen, title, toggle, size } = props;
  return (
    <Modal isOpen={modalOpen} toggle={toggle} size={size || "md"}>
      <ModalHeader>{title && title}</ModalHeader>
      <ModalBody>
        {props.children}
        <button className="btn btn-light float-right" onClick={toggle}>
          Close
        </button>
      </ModalBody>
    </Modal>
  );
}

export default GenericModal;
