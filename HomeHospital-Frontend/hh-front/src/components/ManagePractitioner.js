import React, { useEffect, useState, useContext } from "react";
import { Table, Modal, Button, Form, ListGroup } from "react-bootstrap";
import Users from "../data/practitioners.json";
import { AdminContext } from "./AdminContext";
import axios from "axios";

function ManagePractitioner() {
  const [modalState, setModalState] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
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

  //get the list of hospitals
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/medicalFacility/viewFacilities")
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
        }
      });
    }
  };

  //this will be called once the user selects delete beside the practitioner
  const handleDelete = (e) => {
    {
      practitionerList.map((prac) => {
        if (prac._id === e) {
          setSelectedUser(prac.user.firstName);
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

  //show list of practitioners when you close the edit window
  const showUserList = () => {
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
    alert("We created a new user!");

    axios
      .post("http://localhost:4000/api/registerP/", {
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
  };


  // "firstName": new_firstName,
  // "lastName": new_lastName,
  // "password": new_password,
  // "email": new_email,
  // "streetAddress": new_address,
  // "cityName": new_city,
  // "provName": new_prov,
  // "postalCode": new_postalCode,
  // "phoneNumber": new_phoneNum,
  // "practitionerId": new_practitionerId,
  // "role": new_role,
  // "facilityId": new_facilityId

  //this component will show if the userType select is equal to practitioner
  //editDisplay - edit window for the selected user
  //userDisplay - shows all the practitioners
  //createDisplay - create window for a new practitioner
  return (
    <>
      <div className="userDisplay-div">
        {editDisplay && (
          <>
            <div className="editUser-div">
              <h3>User ID: {id} </h3>
              <Form>
                <Form.Group>
                  <Form.Label>User role: </Form.Label>
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
                  <Form.Label>First name: </Form.Label>
                  <Form.Control
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Last name: </Form.Label>
                  <Form.Control
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Phone numer: </Form.Label>
                  <Form.Control
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Address: </Form.Label>
                  <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>City: </Form.Label>
                  <Form.Control
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Prov: </Form.Label>
                  <Form.Control
                    value={prov}
                    onChange={(e) => setProv(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Postal code: </Form.Label>
                  <Form.Control
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    size="sm"
                  />
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
                      <tr className="table-row" key={prac._id} value={prac._id}>
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
              {/* <h3>User ID: {id} </h3> */}
              <Form>
                <Form.Group>
                  <Form.Label>Role: </Form.Label>
                  <Form.Select
                    value={role}
                    onChange={(e) => setNewRole(e.target.value)}
                    size="sm"
                  >
                    <option>Doctor</option>
                    <option>Nurse</option>
                  </Form.Select>
                  <Form.Label>Practitioner Id:</Form.Label>
                  <Form.Control
                    onChange={(e) => setNewPractitionerId(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>First name: </Form.Label>
                  <Form.Control
                    onChange={(e) => setNewFirstName(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Last name: </Form.Label>
                  <Form.Control
                    onChange={(e) => setNewLastName(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    onChange={(e) => setNewEmail(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    onChange={(e) => setNewPassword(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Phone number: </Form.Label>
                  <Form.Control
                    onChange={(e) => setNewPhoneNum(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Street address: </Form.Label>
                  <Form.Control
                    onChange={(e) => setNewAddress(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>City: </Form.Label>
                  <Form.Control
                    onChange={(e) => setNewCity(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Prov: </Form.Label>
                  <Form.Control
                    onChange={(e) => setNewProv(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Postal code: </Form.Label>
                  <Form.Control
                    onChange={(e) => setNewPostalCode(e.target.value)}
                    size="sm"
                  />
                  <Form.Label>Hospital:</Form.Label>
                  <Form.Select onChange={(e) => setFacilityId(e.target.value)}>
                    {hospitals.hospitalList?.map((hospital, index) => {
                      return (
                        <option key={index} value={hospital._id}>
                          {hospital.hospitalName}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <div className="grid-div">
                  <div className="confirmChange-div item-2">
                    <Button className="confirmChange-btn" onClick={createUser}>
                      Create new practitioner
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
      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </>
  );
}

export default ManagePractitioner;
