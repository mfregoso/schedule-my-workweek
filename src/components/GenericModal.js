import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

class GenericModal extends React.Component {
  render() {
    const { modalOpen, title, toggle, size } = this.props;
    return (
      <Modal isOpen={modalOpen} toggle={toggle} size={size || "md"}>
        <ModalHeader>{title && title}</ModalHeader>
        <ModalBody>
          {this.props.children}
          <button className="btn btn-muted float-right" onClick={toggle}>
            Close
          </button>
        </ModalBody>
      </Modal>
    );
  }
}

export default GenericModal;
