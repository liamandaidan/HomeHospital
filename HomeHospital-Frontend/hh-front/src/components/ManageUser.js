import React, { useEffect, useState, useContext } from "react";
import { Table, Modal, Button, Form, ListGroup } from "react-bootstrap";
import Users from "../data/users.json";
import { AdminContext } from "./AdminContext";
import axios from "axios";
import ManagePractitioner  from "../components/ManagePractitioner"
import ManagePatient from "../components/ManagePatient"

function ManageUser() {
  const [modalState, setModalState] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [editDisplay, setEditDisplay] = useState(false);
  const [userDisplay, setUserDisplay] = useState(true);
  const [createDisplay, setCreateDisplay] = useState(false);
  const [displayUserType, setDisplayUserType] = useState(true);

  const { menuSelection, userTypeSelection, userSelectId  } = useContext(AdminContext);

  console.log("this is from the context: " + userTypeSelection);
  const [menuChoice, setMenuChoice] = menuSelection;
  const [userType, setUserType] = userTypeSelection;
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

  //display the form if the admin select's edit beside the user name
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
          setAHCNum(user.aHCNumber);
          setEmergName(user.emergencyContactName);
          setEmergNum(user.emergencyConactNumber);
        }
        // else {
        //   setId(user.id);
        //   setType(user.type);
        //   setRole(user.role);
        //   setFirstName(user.firstName);
        //   setLastName(user.lastName);
        //   setDOB(user.dateOfBirth);
        //   setEmail(user.email);
        //   setPhoneNum(user.phoneNumber);
        //   setAddress(user.address);
        //   setCity(user.city);
        //   setProv(user.prov);
        //   setPostalCode(user.postalCode);
        //   setAHCNum(user.aHCNumber);
        //   setEmergName(user.emergencyContactName);
        //   setEmergNum(user.emergencyConactNumber);
        // }
      });
    }
  };

  //display the list of users
  const showUsers = () => {
    setUserDisplay(true);
    setEditDisplay(false);
    setCreateDisplay(false);
  };

  const closeUserWindow = () => {
    setUserType("");
    setDisplayUserType(true);
  };

  const closeManageUserWindow = () => {
    setMenuChoice("");
  }

  const showCreate = () => {
    setCreateDisplay(true);
    setUserDisplay(false);
    setEditDisplay(false);
  };

  const createUser = () => {
    alert("We created a new user!");

      axios
        .post("http://localhost:4000/api/users/PatientInfoVisitRequest", {
          new_id,
          new_type,
          new_gender,
          new_firstName,
          new_DOB,
          new_email,
          new_phoneNum,
          new_address,
          new_city,
          new_prov,
          new_postalCode,
          new_aHCNum,
          new_emergName,
          new_emergNum,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    
  };

  const showPractitioners = () => {
    setUserType("Practitioner");
    console.log("this is the user type: " + userType);
    setDisplayUserType(false);

  }
  const showPatients = () => {
    setUserType("Patient");
    console.log("this is the user type: " + userType);
    setDisplayUserType(false);

  }
  
  return (
    <>
      {menuChoice === "manage" && (
        // <div className="admin-main-div">
        //   <div className="header-div">
        //     <div className="header-1">
        //       <h2>Manage Users</h2>
        //     </div>
        //     <div className="header-2">
        //       <Button className="createNewUser-btn" onClick={showCreate}>
        //         Create new user
        //       </Button>
        //     </div>
        //   </div>
        //   <div className="manageuser-inner-div">
        //     {editDisplay && (
        //       <div className="editUser-div">
        //         <h3>User ID: {id} </h3>
        //         <Form>
        //           <Form.Group>
        //             <Form.Label>User type: </Form.Label>
        //             <Form.Select
        //               value={type}
        //               onChange={(e) => setType(e.target.value)}
        //               size="sm"
        //             >
        //               {" "}
        //               <option defaultValue>{type}</option>
        //               {type === "Patient" ? (
        //                 <>
        //                   <option>Practitioner</option>
        //                   <option>Admin</option>
        //                 </>
        //               ) : (
        //                 <>
        //                   <option>Patient</option>
        //                   <option>Admin</option>
        //                 </>
        //               )}
        //             </Form.Select>
        //             <Form.Label>Gender: </Form.Label>
        //             <Form.Select
        //               value={gender}
        //               onChange={(e) => setGender(e.target.value)}
        //               size="sm"
        //             >
        //               {" "}
        //               <option defaultValue>{gender}</option>
        //               {type === "Male" ? (
        //                 <option>Female</option>
        //               ) : (
        //                 <option>Male</option>
        //               )}
        //             </Form.Select>
        //             <Form.Label>First name: </Form.Label>
        //             <Form.Control
        //               value={firstName}
        //               onChange={(e) => setFirstName(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Last name: </Form.Label>
        //             <Form.Control
        //               value={lastName}
        //               onChange={(e) => setLastName(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Date of birth: </Form.Label>
        //             <Form.Control
        //               type="date"
        //               value={DOB}
        //               onChange={(e) => setDOB(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Email: </Form.Label>
        //             <Form.Control
        //               value={email}
        //               onChange={(e) => setEmail(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Phone numer: </Form.Label>
        //             <Form.Control
        //               value={phoneNum}
        //               onChange={(e) => setPhoneNum(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Address: </Form.Label>
        //             <Form.Control
        //               value={address}
        //               onChange={(e) => setAddress(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>City: </Form.Label>
        //             <Form.Control
        //               value={city}
        //               onChange={(e) => setCity(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Prov: </Form.Label>
        //             <Form.Control
        //               value={prov}
        //               onChange={(e) => setProv(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Postal code: </Form.Label>
        //             <Form.Control
        //               value={postalCode}
        //               onChange={(e) => setPostalCode(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Alberta Health Care: </Form.Label>
        //             <Form.Control
        //               value={aHCNum}
        //               onChange={(e) => setAHCNum(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Emergecy contact name: </Form.Label>
        //             <Form.Control
        //               value={emergName}
        //               onChange={(e) => setEmergName(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Emergency contact number: </Form.Label>
        //             <Form.Control
        //               value={emergNum}
        //               onChange={(e) => setEmergNum(e.target.value)}
        //               size="sm"
        //             />
        //           </Form.Group>
        //           <div className="grid-div">
        //             <div className="item-1">
        //               <a
        //                 className="delete-link"
        //                 onClick={(e) => handleDelete(id)}
        //               >
        //                 Delete User
        //               </a>
        //             </div>
        //             <div className="confirmChange-div item-2">
        //               <Button
        //                 onClick={createUser}
        //                 className="confirmChange-btn"
        //               >
        //                 Confirm Change
        //               </Button>
        //               <br />
        //               <a className="admin-link" onClick={showUsers}>
        //                 Cancel
        //               </a>
        //             </div>
        //           </div>
        //         </Form>
        //       </div>
        //     )}
        //     {userDisplay && (
        //       <div className="userDisplay-div">
        //         <div className="closeWindow">
        //           <a onClick={closeWindow}>close</a>
        //         </div>
        //         <Table className="userDisplay-table">
        //           <thead>
        //             <tr>
        //               <th>#</th>
        //               <th>First Name</th>
        //               <th>Last Name</th>
        //               <th>User Type</th>
        //             </tr>
        //           </thead>
        //           <tbody>
        //             {Users.map((user, index) => {
        //               return (
        //                 <tr className="table-row" key={user.id} value={user.id}>
        //                   <td>{index + 1}</td>
        //                   <td>{user.firstName}</td>
        //                   <td>{user.lastName}</td>
        //                   <td>{user.type}</td>
        //                   <td>
        //                     <a
        //                       className="admin-link"
        //                       onClick={(e) => selectEdit(user.id)}
        //                     >
        //                       Edit
        //                     </a>
        //                   </td>
        //                   <td>
        //                     <a
        //                       className="admin-link"
        //                       onClick={(e) => handleDelete(user.id)}
        //                     >
        //                       Delete
        //                     </a>
        //                   </td>
        //                 </tr>
        //               );
        //             })}
        //           </tbody>
        //         </Table>
        //       </div>
        //     )}
        //     {createDisplay && (
        //       <div className="createUser-div">
        //         {/* <h3>User ID: {id} </h3> */}
        //         <Form>
        //           <Form.Group>
        //             <Form.Label>User type: </Form.Label>
        //             <Form.Select
        //               value={type}
        //               onChange={(e) => setNewType(e.target.value)}
        //               size="sm"
        //             >
        //               <option>Patient</option>
        //               <option>Practitioner</option>
        //               <option>Admin</option>
        //             </Form.Select>
        //             <Form.Label>Gender: </Form.Label>
        //             <Form.Select
        //               onChange={(e) => setNewGender(e.target.value)}
        //               size="sm"
        //             >
        //               <option>Female</option>
        //               <option>Male</option>
        //             </Form.Select>
        //             <Form.Label>First name: </Form.Label>
        //             <Form.Control
        //               onChange={(e) => setNewFirstName(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Last name: </Form.Label>
        //             <Form.Control
        //               onChange={(e) => setNewLastName(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Date of birth: </Form.Label>
        //             <Form.Control
        //               type="date"
        //               onChange={(e) => setNewDOB(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Email: </Form.Label>
        //             <Form.Control
        //               onChange={(e) => setNewEmail(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Phone numer: </Form.Label>
        //             <Form.Control
        //               onChange={(e) => setNewPhoneNum(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Address: </Form.Label>
        //             <Form.Control
        //               onChange={(e) => setNewAddress(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>City: </Form.Label>
        //             <Form.Control
        //               onChange={(e) => setNewCity(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Prov: </Form.Label>
        //             <Form.Control
        //               onChange={(e) => setNewProv(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Postal code: </Form.Label>
        //             <Form.Control
        //               onChange={(e) => setNewPostalCode(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Alberta Health Care: </Form.Label>
        //             <Form.Control
        //               onChange={(e) => setNewAHCNum(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Emergecy contact name: </Form.Label>
        //             <Form.Control
        //               onChange={(e) => setNewEmergName(e.target.value)}
        //               size="sm"
        //             />
        //             <Form.Label>Emergency contact number: </Form.Label>
        //             <Form.Control
        //               onChange={(e) => setNewEmergNum(e.target.value)}
        //               size="sm"
        //             />
        //           </Form.Group>
        //           <div className="grid-div">
        //             <div className="confirmChange-div item-2">
        //               <Button className="confirmChange-btn">Create</Button>
        //               <br />
        //               <a className="admin-link" onClick={showUsers}>
        //                 Cancel
        //               </a>
        //             </div>
        //           </div>
        //         </Form>
        //       </div>
        //     )}
        //   </div>
        // </div>
        <div className="admin-main-div">
          <div className="header-1">
            <div><h2>Manage Users</h2></div>
            </div>
          {displayUserType && (
            <>
             <div className="userDisplay-div">
               <ListGroup>
                 <ListGroup.Item action onClick={showPatients}>
                   Patients
                 </ListGroup.Item>
                 <ListGroup.Item action onClick={showPractitioners}>
                   Practitioners
                 </ListGroup.Item>
               </ListGroup>
             </div>
             <div className="footer-2"><a onClick={closeManageUserWindow}>&lt; Back</a></div>
             </>
          )}
          <div>
               {userType === "Practitioner" &&  (
                 <>        
                 <ManagePractitioner /> 
                 <div className="footer-div">
                  <div className="footer-1"><Button className="createNewUser-btn">Create new practitioner</Button></div>
                 <div className="footer-2"><a onClick={closeUserWindow}>&lt; Back to users</a></div>
                 </div>
                 </>
               )
               }
               {userType === "Patient" &&  (
                 <>
                 <ManagePatient />
                 <div className="footer-2"><a onClick={closeUserWindow}>&lt; Back to users</a></div>
                 </>
               )
               }

             </div>

        </div>
      )}

      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </>
  );
}

export default ManageUser;
