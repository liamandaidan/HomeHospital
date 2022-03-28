import React, { useEffect, useState, useContext } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import Users from "../data/users.json";
import { AdminContext } from "./AdminContext";

function ManageUser() {
  const [modalState, setModalState] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [editDisplay, setEditDisplay] = useState(false);
  
  const { displayUsers } = useContext(AdminContext);
  console.log(displayUsers);
  const [userDisplay, setUserDisplay] = displayUsers;

  //selected user details to edit
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [aHCNum, setAHCNum] = useState("");
  const [emergName, setEmergName] = useState("");
  const [emergNum, setEmergNum] = useState("");

  console.log(Users);

  //load all users
  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:4000/api/users/PatientInfoVisitRequest")
  //       .then((response) => {
  //           console.log(response);

  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  //push updated user information
    // useEffect(() => {
    //   axios
    //     .post("http://localhost:4000/api/users/PatientInfoVisitRequest", {
    //       id,
    //       type,
    //       firstName,
    //       lastName,
    //       phoneNum,
    //       address,
    //       city,
    //       postalCode,
    //       aHCNum,
    //       emergName,
    //       emergNum
    //     })
    //     .then((response) => {
    //         console.log(response);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }, []);

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

  //check the id, display alert to confirm
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

  const selectEdit = (e) => {
    setUserDisplay(false);
    // setDisplayUsers(false);
    setEditDisplay(true);

    {
      Users.map((user) => {
        if (user.id === e) {
          setId(user.id);
          setType(user.type);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhoneNum(user.phoneNumber);
          setAddress(user.address);
          setCity(user.city);
          setPostalCode(user.postalCode);
          setAHCNum(user.aHCNumber);
          setEmergName(user.emergencyContactName);
          setEmergNum(user.emergencyConactNumber);
        }
      });
    }
  };

  const showUsers = () => {
    setUserDisplay(true);
    // setDisplayUsers(true);
    setEditDisplay(false);
  };

  return (
    <>
      {/* <Button onClick={showUsers}>show users</Button> */}

      {/* the values are set to read only for now until we figure out how are sending information */}
      <div className="manageuser-inner-div">
        {editDisplay && (
          <div className="editUser-div">
            <h3>User ID: {id} </h3>
            <Form>
              <Form.Group>
                <Form.Label>User type: </Form.Label>
                <Form.Control value={type} onChange={(e) => setType(e.target.value)} size="sm" />
                <Form.Label>First name: </Form.Label>
                <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} size="sm" />
                <Form.Label>Last name: </Form.Label>
                <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} size="sm" />
                <Form.Label>Phone numer: </Form.Label>
                <Form.Control value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} size="sm" />
                <Form.Label>Address: </Form.Label>
                <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} size="sm" />
                <Form.Label>City: </Form.Label>
                <Form.Control value={city} onChange={(e) => setCity(e.target.value)} size="sm" />
                <Form.Label>Postal code: </Form.Label>
                <Form.Control value={postalCode} onChange={(e) => setPostalCode(e.target.value)} size="sm" />
                <Form.Label>Alberta Health Care: </Form.Label>
                <Form.Control value={aHCNum} onChange={(e) => setAHCNum(e.target.value)} size="sm" />
                <Form.Label>Emergecy contact name: </Form.Label>
                <Form.Control value={emergName} onChange={(e) => setEmergName(e.target.value)} size="sm" />
                <Form.Label>Emergency contact number: </Form.Label>
                <Form.Control value={emergNum} onChange={(e) => setEmergNum(e.target.value)} size="sm" />
              </Form.Group>
              <div className="confirmChange-div">
                <Button className="confirmChange-btn">Confirm Change</Button>
                <br />
                <a onClick={showUsers}>Cancel</a>
              </div>
            </Form>
          </div>
        )}
        {userDisplay && (
          <div className="userDisplay-div">
            <Table hover className="userDisplay-table">
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
                    <tr key={user.id} value={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.type}</td>
                      <td>
                        <a onClick={(e) => selectEdit(user.id)}>Edit</a>
                      </td>
                      <td>
                        <a onClick={(e) => handleDelete(user.id)}>Delete</a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </>
  );
}

export default ManageUser;
