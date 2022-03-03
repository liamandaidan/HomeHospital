import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../styles/modal.css";

function AlertModal() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        // backdrop="static"
        // keyboard={false}
        className="modal-alert"
      >
        <Modal.Header>
          <Modal.Title className="modal-title modal-dialog-centered">
            Attention!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-content modal-dialog-centered">
          <p>
            This will be a disclaimer stating that the information entered is up
            to patient discretion. If they feel this is an emergency that is in
            need of urgent care, call 911.
          </p>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <div className="div-footer">
            <Button className="ack-btn" variant="primary">
              I Acknowledge
            </Button>
            <div>
              <a className="cancel-lnk" onClick={handleClose}>cancel request</a>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<AlertModal />);

export default AlertModal;
