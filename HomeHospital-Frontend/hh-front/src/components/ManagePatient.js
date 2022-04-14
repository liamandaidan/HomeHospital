import React, { useEffect, useState, useContext } from "react";
import { Table, Modal, Button, Form, ListGroup } from "react-bootstrap";
import Users from "../data/users.json";
import { AdminContext } from "./AdminContext";
import axios from "axios";
/**
 * Display the Patient component where the user will be able to delete a selected patient. 
 * @returns list of patients
 * @author Robyn Balanag 
 */
function ManagePatient() {
  const [modalState, setModalState] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [patientList, setPatientList] = useState([]);
  const { menuSelection, userTypeSelection } = useContext(AdminContext);
  const [menuChoice, setMenuChoice] = menuSelection;
  const [userType, setUserType] = userTypeSelection;
  /**
   * Load all patient from the database and set to an array of patients
   */
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
  /**
   * Reload the list of patients if any changes were made
   * and set to an array of patients
   */
  const loadPatients = () => {
    axios
    .get("http://localhost:4000/api/admin/patientList")
    .then((response) => {
      setPatientList(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  /**
   * Alert model that will be displayed when a user is selected to be deleted. The user
   * must confirm before proceeding
   * @param {*} props user information
   * @returns alert modal when the user is selected to be deleted from the database
   */
  const AlertModal = (props) => {
    return (
      <>
        <Modal {...props} centered>
          <Modal.Header className="modal-title">
            <Modal.Title>Attention!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-content">
            <label>Are you sure you want to delete {selectedUserName} ?</label>
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
/**
   * Set the selected admin as the selected user to delete
   * @param {*} e admin id that will be deleted
   */
  const handleDelete = (e) => {
    {
      patientList.map((patient) => {
        if (patient._id === e) {
          setSelectedUser(patient._id);
          setSelectedUserName(patient.user.firstName);
          setModalState(true);
        }
      });
    }
  };
  /**
    * Once the user has confirmed they want to delete the admin from the
    * modal, the admin's id will be sent to the database to be deleted
    */
  const confirmDelete = () => {
    const deleteRoute = "http://localhost:4000/api/admin/patient/";

    axios
    .delete( deleteRoute + selectedUser, {
      withCredentials: true,
      // patientId: selectedUser,
    })
    .then((response) => {
      loadPatients();
    })
    .catch((err) => {
      console.log(err);
    })

    setModalState(false);
    

  };
  /**
   * Hide the list of users
   */
  const closeWindow = () => {
    setUserType("");
  };

  
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
