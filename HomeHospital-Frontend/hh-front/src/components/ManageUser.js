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
                 <div className="footer-2"><a onClick={closeUserWindow}>&lt; Back to users</a></div>
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
