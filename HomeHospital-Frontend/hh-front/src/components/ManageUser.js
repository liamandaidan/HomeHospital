import React, { useEffect, useState, useContext } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AdminContext } from "./AdminContext";
import axios from "axios";
import ManagePractitioner from "../components/ManagePractitioner";
import ManagePatient from "../components/ManagePatient";
import ManageAdmin from "../components/ManageAdmin";

function ManageUser() {

  const [displayUserType, setDisplayUserType] = useState(true);

  const { menuSelection, userTypeSelection, closeWindows } = useContext(AdminContext);

  const [menuChoice, setMenuChoice] = menuSelection;
  const [userType, setUserType] = userTypeSelection;
  const [close, setClose] = closeWindows;

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
    // console.log("this is the user type: " + userType);
    setDisplayUserType(false);
    setClose(false)
  };

  //shows list of patients when slected
  const showPatients = () => {
    setUserType("Patient");
    // console.log("this is the user type: " + userType);
    setDisplayUserType(false);
    setClose(false)
  };

  //show list of administrators
  const showAdmins = () => {
    setUserType("Admin");
    // console.log("this is the user type: " + userType);
    setDisplayUserType(false);
    setClose(false)
  };

  useEffect(() => {
    if(close) {
      setUserType("");
      closeUserWindow();
    }
  }, [close])


  
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
                  <ListGroup.Item action onClick={showAdmins}>
                    Administrators
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
            {userType === "Admin" && (
              <>
              <ManageAdmin />
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
