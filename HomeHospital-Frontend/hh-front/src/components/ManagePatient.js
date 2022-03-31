import React, { useEffect, useState, useContext } from "react";
import { Table, Modal, Button, Form, ListGroup } from "react-bootstrap";
import Users from "../data/users.json";
import { AdminContext } from "./AdminContext";
import axios from "axios";

function ManagePatient() {

const [modalState, setModalState] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [editDisplay, setEditDisplay] = useState(false);
  const [userDisplay, setUserDisplay] = useState(true);
  const [createDisplay, setCreateDisplay] = useState(false);
  const [displayUserType, setDisplayUserType] = useState(true);

  //get all info from the context
  const { menuSelection,  userTypeSelection, userSelectId } = useContext(AdminContext);

    //get the menu selection from context
  const [menuChoice, setMenuChoice] = menuSelection;
  
  //get the user type that was select
  const [userType, setUserType] = userTypeSelection;

  //get the user id that was selected from the list
  const [userChoiceId, setUserChoiceId] = userSelectId;

    //alert model when admin request to delete a user
    const AlertModal = (props) => {
        return (
          <>
            <Modal {...props} centered>
              <Modal.Header className="modal-title">
                <Modal.Title>Attention!</Modal.Title>
              </Modal.Header>
              <Modal.Body className="modal-content">
                <label>Are you sure you want to delete {selectedUser} ?</label>
              </Modal.Body>
              <Modal.Footer className="modal-footer">
                <div className="confirm-btn-div">
                  <Button
                    className="ack-btn"
                    variant="primary"
                    onClick={confirmDelete}
                  >
                    Confirm Delete
                  </Button>
                  <br />
                  <a className="cancel-lnk" onClick={props.onHide}>
                    cancel
                  </a>
                </div>
              </Modal.Footer>
            </Modal>
          </>
        );
      };

  //this will be called once the user selects delete beside the patient
  const handleDelete = (e) => {
    console.log("this is the if of the user to delete: " + e);

    {
      Users.map((user) => {
        if (user.id === e) {
          setSelectedUser(user.firstName);
          setModalState(true);
        }
      });
    }
  };

  //delete the user once confirmed
  const confirmDelete = () => {
    alert({ selectedUser } + " has been deleted!");
    setModalState(false);
  };

  const closeWindow = () => {
      setUserType("");
  }

  //this component will show if the userType select is equal to patient
  return (
    <>
    <div><a onClick={closeWindow}>x</a></div>
      <Table className="userDisplay-table">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user, index) => {
            return (
              <tr className="table-row" key={user.id} value={user.id}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.type}</td>
                <td>
                  <a
                    className="admin-link"
                    onClick={(e) => handleDelete(user.id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </>
  );
}

export default ManagePatient;
