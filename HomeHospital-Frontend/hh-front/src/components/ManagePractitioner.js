import React, { useEffect, useState, useContext } from "react";
import {
  Table,
  Modal,
  Button,
  Form,
  ListGroup,
  FloatingLabel,
} from "react-bootstrap";
import Users from "../data/practitioners.json";
import { AdminContext } from "./AdminContext";
import axios from "axios";

axios.defaults.withCredentials = true;

function ManagePractitioner() {
  const [modalState, setModalState] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [editDisplay, setEditDisplay] = useState(false);
  const [userDisplay, setUserDisplay] = useState(true);
  const [createDisplay, setCreateDisplay] = useState(false);
  const [displayUserType, setDisplayUserType] = useState(true);

  const [practitionerList, setPractitionerList] = useState([]);

  //get all info from the context
  const { userTypeSelection } = useContext(AdminContext);

  //get the user type that was select
  const [userType, setUserType] = userTypeSelection;

  //selected user details to edit
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [prov, setProv] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [role, setRole] = useState("");
  const [facilityId, setFacilityId] = useState("");
  const [practitionerId, setPractitionerId] = useState("");
  const [defaultHospital, setDefaultHospital] = useState("");

  //information for new user
  const [new_id, setNewId] = useState("");
  const [new_role, setNewRole] = useState("");
  const [new_firstName, setNewFirstName] = useState("");
  const [new_lastName, setNewLastName] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [new_email, setNewEmail] = useState("");
  const [new_address, setNewAddress] = useState("");
  const [new_city, setNewCity] = useState("");
  const [new_prov, setNewProv] = useState("");
  const [new_postalCode, setNewPostalCode] = useState("");
  const [new_phoneNum, setNewPhoneNum] = useState("");
  const [new_facilityId, setNewFacilityId] = useState("");
  const [new_practitionerId, setNewPractitionerId] = useState("");

  const [hospitals, setHospitals] = useState([]);

  //form validation
  const [validNameValue, setValidNameValue] = useState(false);
  const [validAddressValue, setValidAddressValue] = useState(false);
  const [validCityValue, setValidCityValue] = useState(false);
  const [validPostalValue, setValidPostalValue] = useState(false);
  const [validPhoneValue, setValidPhoneValue] = useState(false);
  const [validEmailValue, setValidEmailValue] = useState(false);
  const [validPasswordValue, setValidPasswordValue] = useState(false);
  const [validClientFormValue, setValidClientFormValue] = useState(false);
  const [resetAllFormValue] = useState(false);


  //get the list of hospitals
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/medicalFacility/viewFacilitiesAdmin")
      .then((response) => {
        //console.log("these are the hospitals: " + response.data.hospitalList);
        setHospitals(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //load all users
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/practitionerList")
      .then((response) => {
        console.log(response);
        setPractitionerList(response.data);
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

  const selectEdit = (e) => {
    setUserDisplay(false);
    setEditDisplay(true);
    setCreateDisplay(false);
    
    {
      practitionerList.map((prac) => {
        console.log(prac._id);
        if (prac._id === e) {
          setId(prac._id);
          setRole(prac.role);
          setFirstName(prac.user.firstName);
          setLastName(prac.user.lastName);
          setPasword(prac.password);
          setEmail(prac.email);
          setPhoneNum(prac.user.phoneNumber);
          setAddress(prac.user.address.streetAddress);
          setCity(prac.user.address.cityName);
          setProv(prac.user.address.provName);
          setPostalCode(prac.user.address.postalCode);
          setPractitionerId(prac.practitionerId)
        }
      });
    }
  };

  //this will be called once the user selects delete beside the practitioner
  const handleDelete = (e) => {
    {
      practitionerList.map((prac) => {
        if (prac._id === e) {
          setSelectedUser(prac._id);
          setSelectedUserName(prac.user.firstName);
          setModalState(true);
        }
      });
    }
  };

  //delete the user once confirmed
  const confirmDelete = () => {
    const deleteRoute = "http://localhost:4000/api/admin/practitioner/";

    axios
    .delete( deleteRoute + selectedUser, {
      withCredentials: true,
    })
    .then((response) => {
      alert({ selectedUser } + " has been deleted!");
    })
    .catch((err) => {
      console.log(err);
    })

    setModalState(false);
  };

  const confirmChanges = (idToChange) => {

    // console.log(idToChange);
    // console.log(firstName);


    axios
    .post("http://localhost:4000/api/admin/modifyPractitioner", {
      withCredentials: true,
      id: id,
      practitionerId: practitionerId,
      role: role,
      user : { 
        firstName: firstName,
        lastName: lastName,
        address: {
          streetAddress: address,
          cityName: city,
          provName: prov,
          postalCode: postalCode,
        },
        phoneNumber: phoneNum,
      },
      email: email,
      facilityId: facilityId,
    })
    .then((response) => {
      alert({ selectedUser } + "has been changed!");
    })
    .catch((err) => {
      console.log(err);
    })

    setEditDisplay(false);
    setUserDisplay(true);

  }

  //show list of practitioners when you close the edit window
  const showUserList = () => {
    setNewFirstName("");
    setNewLastName("");
    setNewPassword("");
    setNewEmail("");
    setNewAddress("");
    setNewCity("");
    setNewProv("");
    setNewPostalCode("");
    setNewPhoneNum("");
    setNewPractitionerId("");
    setNewRole("");
    setNewFacilityId("");

    setCreateDisplay(false);
    setEditDisplay(false);
    setUserDisplay(true);
  };

  //show create form for new practitioner
  const showCreate = () => {
    setCreateDisplay(true);
    setUserDisplay(false);
    setEditDisplay(false);
  };

  //creates a new preactitioner and sends to the back end
  const createUser = () => {
    axios
      .post("http://localhost:4000/api/registerP/", {
        withCredentials: true,
        firstName: new_firstName,
        lastName: new_lastName,
        password: new_password,
        email: new_email,
        streetAddress: new_address,
        cityName: new_city,
        provName: new_prov,
        postalCode: new_postalCode,
        phoneNumber: new_phoneNum,
        practitionerId: new_practitionerId,
        role: new_role,
        facilityId: new_facilityId,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("We created a new user!");
    setCreateDisplay(false);
    setUserDisplay(true);
  };

  // check if the form is valid
  useEffect(() => {
    if (
      validNameValue &&
      validAddressValue &&
      validCityValue &&
      validPostalValue &&
      validPhoneValue &&
      validEmailValue 
    ) {
      setValidClientFormValue(true);
    } else {
      setValidClientFormValue(false);
    }
  }, [
    validNameValue,
    validAddressValue,
    validCityValue,
    validPostalValue,
    validPhoneValue,
    validEmailValue,
    setValidClientFormValue,
    validClientFormValue,
  ]);

  function validateFirstName() {
    const symbols = /[`!@#$%^&*()_+\-=[]{};':"\|,.<>\?~]/;
    const namePattern = new RegExp(symbols);
    const isName = isNaN(new_firstName);
    if (
      isName === false ||
      new_firstName === "" ||
      new_firstName === undefined
    ) {
      console.log("the first name is empty!");
      setValidNameValue(false);
    } else if (namePattern.test(new_firstName)) {
      console.log("the first name isnt valid!");
      setValidNameValue(false);
    } else {
      console.log("the first name is good!");
      setValidNameValue(true);
    }
  }

  function validateLastName() {
    const symbols = /[`!@#$%^&*()_+\-=[]{};':"\|,.<>\?~]/;
    const namePattern = new RegExp(symbols);
    const isName = isNaN(new_lastName);
    if (
      isName === false ||
      new_lastName === "" ||
      new_lastName === undefined
    ) {
      console.log("last name is good!");
      setValidNameValue(false);
    } else if (namePattern.test(new_lastName)) {
      setValidNameValue(false);
    } else {
      setValidNameValue(true);
    }
  }

  function validateAddress() {
    const pattern = new RegExp("^[a-zA-Z0-9- ]+$");
    if (new_address === "" || new_address === undefined) {

      setValidAddressValue(false);
    } else if (pattern.test(new_address)) {

      setValidAddressValue(true);
    } else {

      setValidAddressValue(false);
    }
  }

  function validateCity() {
    const pattern = new RegExp("^[a-zA-Z0-9- ]+$");
    if (new_city === "" || new_city === undefined) {

      setValidCityValue(false);
    } else if (pattern.test(new_city)) {

      setValidCityValue(true);
    } else {

      setValidCityValue(false);
    }
  }

  function validatePostalCode() {
    const pattern = new RegExp("^[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]$");
    if (pattern.test(new_postalCode)) {
  
      setValidPostalValue(true);
    } else {

      setValidPostalValue(false);
    }
  }

  function validatePhone() {
    // Regex found here https://stackoverflow.com/questions/9776231/regular-expression-to-validate-us-phone-numbers
    const pattern = new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$");
    if (pattern.test(new_phoneNum)) {

      setValidPhoneValue(true);
    } else {

      setValidPhoneValue(false);
    }
  }

  function validateEmail() {
    const pattern = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
    if (pattern.test(new_email)) {
 
      setValidEmailValue(true);
    } else {

      setValidEmailValue(false);
    }
  }


  //this component will show if the userType select is equal to practitioner
  //editDisplay - edit window for the selected user
  //userDisplay - shows all the practitioners
  //createDisplay - create window for a new practitioner
  return (
    <>
      <div className="admin-main-div">
        <div className="header-1">
          <div>
            <h2>Manage Practitioners</h2>
          </div>
        </div>
        <div className="userDisplay-div">
          {editDisplay && (
            <>
              <div className="editUser-div">
                <h3>User ID: {practitionerId} </h3>
                <br />
                <Form>
                  <Form.Group>
                    <FloatingLabel
                      label="Role"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        size="sm"
                      >
                        {" "}
                        <option defaultValue>{role}</option>
                        {role === "Nurse" ? (
                          <>
                            <option>Doctor</option>
                          </>
                        ) : (
                          <>
                            <option>Nurse</option>
                          </>
                        )}
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                      label="First Name"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        size="sm"
                      />  
                    </FloatingLabel>
                    <FloatingLabel
                      label="Last Name"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Email Address"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Phone Number"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={phoneNum}
                        onChange={(e) => setPhoneNum(e.target.value)}
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Street Address"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="City"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Province"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={prov}
                        onChange={(e) => setProv(e.target.value)}
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Postal Code"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Facility"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Select
                        value={facilityId}
                        onChange={(e) => setFacilityId(e.target.value)}
                      >
                        {hospitals.hospitalList?.map((hospital, index) => {
                          {hospital._id === facilityId && (
                            <option select>{hospital.hospitalName}</option>
                          )}
                          return (
                            <>     
                            <option key={index} value={hospital._id}>
                              {hospital.hospitalName}
                            </option> 
                            </>
                          );
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                  <div className="grid-div">
                    <div className="item-1">
                      <a
                        className="delete-link"
                        onClick={(e) => handleDelete(id)}
                      >
                        Delete User
                      </a>
                    </div>
                    <div className="confirmChange-div item-2">
                      <Button className="change-btn" onClick={(e) => confirmChanges(id)}>Confirm changes</Button>
                      <br />
                      <a className="admin-link" onClick={showUserList}>
                        Cancel
                      </a>
                    </div>
                  </div>
                </Form>
              </div>
            </>
          )}
          {userDisplay && (
            <>
              <div className="userDisplay-table">
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {practitionerList.map((prac, index) => {
                      return (
                        <tr
                          className="table-row"
                          key={prac._id}
                          value={prac._id}
                        >
                          <td>{index + 1}</td>
                          <td>{prac.user.firstName}</td>
                          <td>{prac.user.lastName}</td>
                          <td>
                            <a
                              className="admin-link"
                              onClick={(e) => selectEdit(prac._id)}
                            >
                              Edit
                            </a>
                          </td>
                          <td>
                            <a
                              className="admin-link"
                              onClick={(e) => handleDelete(prac._id)}
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
              <div className="footer-1">
                <Button className="createNewUser-btn" onClick={showCreate}>
                  Create new practitioner
                </Button>
              </div>
            </>
          )}
          {createDisplay && (
            <>
              <div className="createUser-div">
                <Form>
                  <Form.Group>
                    <FloatingLabel
                      label="Role"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Select
                        onChange={(e) => setNewRole(e.target.value)}
                        size="sm"
                      >
                        <option>Please select a role</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Clerk">Clerk</option>
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                      required
                      label="Practitioner Id"
                      controlId="floatingInput idHelp"
                      className="mb-3"
                    >
                      <Form.Control
                        value={new_practitionerId}
                        placeholder="12345678"
                        pattern="[0-9]"
                        onChange={(e) => setNewPractitionerId(e.target.value)}
                        size="sm"
                        min={7}
                      />
                       <Form.Text id="idHelp" muted>
                        The practitioner identification is a 7 digit number
                      </Form.Text>
                    </FloatingLabel>
                    <FloatingLabel
                      label="First Name"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        onBlur={validateFirstName}
                        value={new_firstName}
                        pattern="[A-Za-z- ]+"
                        placeholder="John"
                        onChange={(e) => setNewFirstName(e.target.value)}
                        size="sm"
                        required
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Last Name"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        onBlur={validateLastName}
                        value={new_lastName}
                        pattern="[A-Za-z- ]+"
                        placeholder="Smith"
                        onChange={(e) => setNewLastName(e.target.value)}
                        size="sm"
                        required
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Email Address"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        onBlur={validateEmail}
                        value={new_email}
                        placeholder="smith@email.com"
                        pattern="^[a-zA-Z0-9_.-]+@[a-zA-Z]+[\.][a-zA-Z]{2,}$"
                        onChange={(e) => setNewEmail(e.target.value)}
                        size="sm"
                        required
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Phone Number"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        onBlur={validatePhone}
                        value={new_phoneNum}
                        onChange={(e) => setNewPhoneNum(e.target.value)}
                        placeholder="123-456-1234"
                        pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                        size="sm"
                        required
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Street Address"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        onBlur={validateAddress}
                        value={new_address}
                        pattern="^[a-zA-Z0-9- ]+$"
                        placeholder="123 Street"
                        onChange={(e) => setNewAddress(e.target.value)}
                        size="sm"
                        required
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="City"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        onBlur={validateCity}
                        value={new_city}
                        pattern="^[a-zA-Z]+$"
                        placeholder="City name"
                        onChange={(e) => setNewCity(e.target.value)}
                        size="sm"
                        required
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Province"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Select
                        name="province"
                        value={new_prov}
                        onChange={(e) => setNewProv(e.target.value)}
                      >
                        <option>Please select province</option>
                        <option value="AB">AB</option>
                        <option value="BC">BC</option>
                        <option value="NB">NB</option>
                        <option value="NL">NL</option>
                        <option value="NT">NT</option>
                        <option value="NS">NS</option>
                        <option value="NU">NU</option>
                        <option value="ON">ON</option>
                        <option value="PE">PE</option>
                        <option value="QC">QC</option>
                        <option value="SK">SK</option>
                        <option value="YT">YT</option>
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                      label="Postal Code"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        onBlur={validatePostalCode}
                        value={new_postalCode}
                        placeholder="L9L9L9"
                        pattern="[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]"
                        onChange={(e) => setNewPostalCode(e.target.value)}
                        size="sm"
                        required
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Facility"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Select
                        onChange={(e) => setNewFacilityId(e.target.value)}
                      >
                        <option>Please select a hospital</option>
                        {hospitals.hospitalList?.map((hospital, index) => {
                          return (
                            <option key={index} value={hospital._id}>
                              {hospital.hospitalName}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                      label="Password"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={new_password}
                        placeholder="Minimum 10 characters"
                        minLength={10}
                        onChange={(e) => setNewPassword(e.target.value)}
                        size="sm"
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <div className="grid-div">
                    <div className="confirmChange-div item-2">
                      <Button
                        disabled={!validClientFormValue}
                        className="confirmChange-btn"
                        onClick={createUser}
                      >
                        Submit
                      </Button>
                      <br />
                      <a className="admin-link" onClick={showUserList}>
                        Cancel
                      </a>
                    </div>
                  </div>
                </Form>
              </div>
            </>
          )}
        </div>
      </div>
      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </>
  );
}

export default ManagePractitioner;
