import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../styles/modal.css";

/**
 * @name Alert Modal for patients
 * @summary This modal pops up and alerts users with a disclaimer before they continue submitting
 * their hospital visit request
 * @author Robyn Balanag
 * @returns Alert modal in the middle of the page informing users with a disclaimer can Acknowledge and continue or
 * cancel hospital visit request.
 */
function AlertModal(props) {
  return (
    <>
      <Modal
        {...props}
        centered
      >
        <Modal.Header className="modal-title">
          <Modal.Title>
            Attention!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-content">
          <p>
            This will be a disclaimer stating that the information entered is up
            to patient discretion. If they feel this is an emergency that is in
            need of urgent care, call 911.
          </p>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button className="ack-btn" onClick={props.onHide} variant="primary">
            I Acknowledge
          </Button>
          <div>
            <a className="cancel-lnk" onClick={props.onHide}>
              cancel request
            </a>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// render(<AlertModal />);

export default AlertModal;
