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
          <br />
          <button className="btn btn-muted text-right" onClick={toggle}>
            Close
          </button>
        </ModalBody>
      </Modal>
    );
  }
}

export default GenericModal;
