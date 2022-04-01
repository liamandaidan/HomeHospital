import React, { useEffect, useState, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { AdminContext } from "./AdminContext";
import axios from "axios";
import ManagePractitioner from "../components/ManagePractitioner";
import ManagePatient from "../components/ManagePatient";

function ManageUser() {

  const [displayUserType, setDisplayUserType] = useState(true);

  const { menuSelection, userTypeSelection } = useContext(AdminContext);

  console.log("this is from the context: " + userTypeSelection);
  const [menuChoice, setMenuChoice] = menuSelection;
  const [userType, setUserType] = userTypeSelection;


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

  //closes the window displaying user
  const closeUserWindow = () => {
    setUserType("");
    setDisplayUserType(true);
  };

  //closes the manage user view
  const closeManageUserWindow = () => {
    setMenuChoice("");
  };

  //shows list of practitioners when selected
  const showPractitioners = () => {
    setUserType("Practitioner");
    console.log("this is the user type: " + userType);
    setDisplayUserType(false);
  };

  //shows list of patients when slected
  const showPatients = () => {
    setUserType("Patient");
    console.log("this is the user type: " + userType);
    setDisplayUserType(false);
  };

  return (
    <>
      {menuChoice === "manage" && (
        <div className="admin-main-div">
          {displayUserType && (
            <>
            <div className="header-1">
              <div>
                <h2>Manage Users</h2>
              </div>
            </div>
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
              <div className="footer-2">
                <a onClick={closeManageUserWindow}>&lt; Back</a>
              </div>
            </>
          )}
          <div>
            {userType === "Practitioner" && (
              <>
                <ManagePractitioner />
                <div className="footer-2">
                  <a onClick={closeUserWindow}>&lt; Back to users</a>
                </div>
              </>
            )}
            {userType === "Patient" && (
              <>
                <ManagePatient />
                <div className="footer-2">
                  <a onClick={closeUserWindow}>&lt; Back to users</a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ManageUser;
