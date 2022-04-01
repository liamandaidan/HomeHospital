import React, { useEffect, useState, useContext } from "react";
import { Table, Modal, Button, Form, ListGroup } from "react-bootstrap";
import Users from "../data/users.json";
import { AdminContext } from "./AdminContext";
import axios from "axios";

function ManagePatient() {
  const [modalState, setModalState] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const [patientList, setPatientList] = useState([]);

  //get all info from the context
  const { menuSelection, userTypeSelection } = useContext(AdminContext);

  //get the menu selection from context
  const [menuChoice, setMenuChoice] = menuSelection;

  //get the user type that was select
  const [userType, setUserType] = userTypeSelection;

  // load all users
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/patientList")
      .then((response) => {
        console.log(response);
        setPatientList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      patientList.map((patient) => {
        if (patient._id === e) {
          setSelectedUser(patient.user.firstName);
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
  };

  //this component will show if the userType select is equal to patient
  return (
    <>
      <div className="admin-main-div">
        <div className="header-1">
          <div>
            <h2>Manage Patients</h2>
          </div>
        </div>
        <div className="userDisplay-div">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {patientList.map((patient, index) => {
                return (
                  <tr
                    className="table-row"
                    key={patient._id}
                    value={patient._id}
                  >
                    <td>{index + 1}</td>
                    <td>{patient.user.firstName}</td>
                    <td>{patient.user.lastName}</td>
                    <td>
                      <a
                        className="admin-link"
                        onClick={(e) => handleDelete(patient._id)}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </>
  );
}

export default ManagePatient;
