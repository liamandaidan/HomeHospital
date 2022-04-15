import React, { useEffect, useState, useContext } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AdminContext } from "./AdminContext";
import ManagePractitioner from "../components/ManagePractitioner";
import ManagePatient from "../components/ManagePatient";
import ManageAdmin from "../components/ManageAdmin";
/**
 * Will display a submenu of users that the administrator will be able to select from.
 * Depending on their option, the component will change and display the selected user type info.
 * @returns submenu component of current users: patients, administrators, and practitioners
 * @author Robyn Balanag
 */
function ManageUser() {
  const [displayUserType, setDisplayUserType] = useState(true);
  const { menuSelection, userTypeSelection, closeWindows } =
    useContext(AdminContext);
  const [menuChoice, setMenuChoice] = menuSelection;
  const [userType, setUserType] = userTypeSelection;
  const [close, setClose] = closeWindows;
  /**
   * Hides the submenu of users and brings the user back to the admin
   * landing page
   */
  const closeUserWindow = () => {
    setUserType("");
    setDisplayUserType(true);
  };
  /**
   * Hides the manage user window from the back button
   */
  const closeManageUserWindow = () => {
    setMenuChoice("");
  };
  /**
   * Sets the user type to a practitioner and displays the
   * managePractitioner component
   */
  const showPractitioners = () => {
    setUserType("Practitioner");
    // console.log("this is the user type: " + userType);
    setDisplayUserType(false);
    setClose(false);
  };
  /**
   * Sets the user type to a patient and displays the
   * managePatient component
   */
  const showPatients = () => {
    setUserType("Patient");
    // console.log("this is the user type: " + userType);
    setDisplayUserType(false);
    setClose(false);
  };
  /**
   * Sets the user type to a admin and displays the
   * manageAdmin component
   */
  const showAdmins = () => {
    setUserType("Admin");
    // console.log("this is the user type: " + userType);
    setDisplayUserType(false);
    setClose(false);
  };
  /**
   * takes the user back to the landing page if they select
   * 'manage user' from the main menu
   */
  useEffect(() => {
    if (close) {
      setUserType("");
      closeUserWindow();
    }
  }, [close]);

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
