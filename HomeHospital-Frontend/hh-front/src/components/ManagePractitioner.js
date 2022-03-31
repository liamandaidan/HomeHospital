import React, { useEffect, useState, useContext } from "react";
import { Table, Modal, Button, Form, ListGroup } from "react-bootstrap";
import Users from "../data/users.json";
import { AdminContext } from "./AdminContext";
import axios from "axios";

function ManagePractitioner() {
    const [modalState, setModalState] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");
    const [editDisplay, setEditDisplay] = useState(false);
    const [userDisplay, setUserDisplay] = useState(true);
    const [createDisplay, setCreateDisplay] = useState(false);
    const [displayUserType, setDisplayUserType] = useState(true);

  //get all info from the context
  const { userTypeSelection, userSelectId } = useContext(AdminContext);

  //get the user type that was select
  const [userType, setUserType] = userTypeSelection;

  //get the user id that was selected from the list
  const [userChoiceId, setUserChoiceId] = userSelectId;

   //selected user details to edit
   const [id, setId] = useState("");
   const [type, setType] = useState("");
   const [gender, setGender] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [DOB, setDOB] = useState("");
   const [email, setEmail] = useState("");
   const [phoneNum, setPhoneNum] = useState("");
   const [address, setAddress] = useState("");
   const [city, setCity] = useState("");
   const [prov, setProv] = useState("");
   const [postalCode, setPostalCode] = useState("");
   const [aHCNum, setAHCNum] = useState("");
   const [emergName, setEmergName] = useState("");
   const [emergNum, setEmergNum] = useState("");
   const [role, setRole] = useState("");
 
   //information for new user
   const [new_id, setNewId] = useState("");
   const [new_type, setNewType] = useState("");
   const [new_gender, setNewGender] = useState("");
   const [new_firstName, setNewFirstName] = useState("");
   const [new_lastName, setNewLastName] = useState("");
   const [new_DOB, setNewDOB] = useState("");
   const [new_email, setNewEmail] = useState("");
   const [new_phoneNum, setNewPhoneNum] = useState("");
   const [new_address, setNewAddress] = useState("");
   const [new_city, setNewCity] = useState("");
   const [new_prov, setNewProv] = useState("");
   const [new_postalCode, setNewPostalCode] = useState("");
   const [new_aHCNum, setNewAHCNum] = useState("");
   const [new_emergName, setNewEmergName] = useState("");
   const [new_emergNum, setNewEmergNum] = useState("");
 

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

  const selectEdit = (e) => {
    setUserDisplay(false);
    setEditDisplay(true);
    setCreateDisplay(false);

    {
      Users.map((user) => {
        if (user.id === e) {
          setId(user.id);
          setType(user.type);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setGender(user.gender);
          setDOB(user.dateOfBirth);
          setEmail(user.email);
          setPhoneNum(user.phoneNumber);
          setAddress(user.address);
          setCity(user.city);
          setProv(user.provName);
          setPostalCode(user.postalCode);
        }
      });
    }
  };

  //this will be called once the user selects delete beside the practitioner
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

  //this component will show if the userType select is equal to practitioner
  return (
    <>
    <div className="userDisplay-div">
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
                    onClick={(e) => selectEdit(user.id)}
                  >
                    Edit
                  </a>
                </td>
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
    </div>

      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </>
  );
}

export default ManagePractitioner;
