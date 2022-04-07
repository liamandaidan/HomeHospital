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

function ManageAdmin() {
  const [modalState, setModalState] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [editDisplay, setEditDisplay] = useState(false);
  const [userDisplay, setUserDisplay] = useState(true);
  const [createDisplay, setCreateDisplay] = useState(false);
  const [displayUserType, setDisplayUserType] = useState(true);

  const [adminLlist, setAdminList] = useState([]);

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
  const [adminId, setAdminId] = useState("");
  const [permissionLevel, setPermissionLevel] = useState("");

  //information for new user
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
  const [new_adminId, setNewAdminId] = useState("");
  const [new_permission, setNewPermission] = useState("");


  //load all admins
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/adminList")
      .then((response) => {
        console.log(response);
        setAdminList(response.data);
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
      adminLlist.map((admin) => {
        console.log("this is the permission level: " + admin.permissionLevel);
        if (admin.adminId === e) {
          setAdminId(admin.adminId);
          setFirstName(admin.user.firstName);
          setLastName(admin.user.lastName);
          setPasword(admin.password);
          setEmail(admin.email);
          setPhoneNum(admin.user.phoneNumber);
          setAddress(admin.user.address.streetAddress);
          setCity(admin.user.address.cityName);
          setProv(admin.user.address.provName);
          setPostalCode(admin.user.address.postalCode);
          setPermissionLevel(admin.permissionLevel);
          setId(admin._id);
        }
      });
    }
  };

  //this will be called once the user selects delete beside the practitioner
  const handleDelete = (e) => {
    {
      adminLlist.map((admin) => {
        if (admin.adminId === e) {
          setSelectedUser(admin.user.firstName);
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
    setAdminId("");
    setNewFirstName("");
    setNewLastName("");
    setNewPassword("");
    setNewEmail("");
    setNewAddress("");
    setNewCity("");
    setNewProv("");
    setNewPostalCode("");
    setNewPhoneNum("");
    setNewPermission("");

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
      .post("http://localhost:4000/api/registerA/", {
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
        adminId: new_adminId,
        permissionLevel: new_permission,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    alert("We created a new admin!");
    setCreateDisplay(false);
    setUserDisplay(true);
  };
  
  const confirmChanges = (idToChange) => {

    console.log(idToChange);
    console.log(firstName);

    axios
    .post("http://localhost:4000/api/admin/modifyAdmin", {
      withCredentials: true,
      id: id,
      adminId: adminId,
      permissions: permissionLevel,
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
  //   "firstName": "Ben",
  //   "lastName": "Davis",
  //   "password": "password",
  //   "email": "b.davis_117@hotmail.ca",
  //   "streetAddress": "1 raymond street",
  //   "cityName": "Calgary",
  //   "provName": "AB",
  //   "postalCode": "H0H0H0",
  //   "phoneNumber": "111-444-5555",
  //   "adminId": "1234567",
  //   "permissionLevel": "3"

  //this component will show if the userType select is equal to practitioner
  //editDisplay - edit window for the selected user
  //userDisplay - shows all the practitioners
  //createDisplay - create window for a new practitioner
  return (
    <>
      <div className="admin-main-div">
        <div className="header-1">
          <div>
            <h2>Manage Administrators</h2>
          </div>
        </div>
        <div className="userDisplay-div">
          {editDisplay && (
            <>
              <div className="editUser-div">
                <h3>User ID: {adminId} </h3>
                <br />
                <Form>
                  <Form.Group>
                    <FloatingLabel
                      label="Permission"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Select
                        value={permissionLevel}
                        onChange={(e) => setPermissionLevel(e.target.value)}
                        size="sm"
                      >
                        {/* {permissionLevel === "1"} */}

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
                      <Button onClick={(e) => confirmChanges(id)} className="change-btn">Confirm changes</Button>
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
                    {adminLlist.map((admin, index) => {
                      return (
                        <tr
                          className="table-row"
                          key={admin.adminId}
                          value={admin.adminId}
                        >
                          <td>{index + 1}</td>
                          <td>{admin.user.firstName}</td>
                          <td>{admin.user.lastName}</td>
                          <td>
                            <a
                              className="admin-link"
                              onClick={(e) => selectEdit(admin.adminId)}
                            >
                              Edit
                            </a>
                          </td>
                          <td>
                            <a
                              className="admin-link"
                              onClick={(e) => handleDelete(admin.adminId)}
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
                  Create new admin
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
                      label="Admin Identification Number"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={new_adminId}
                        pattern="[A-Za-z- ]+"
                        onChange={(e) => setNewAdminId(e.target.value)}
                        size="sm"
                        maxLength={7}
                        aria-describedby="permissionsHelp"
                      />
                      <Form.Text id="permissionsHelp" muted>
                        The admin identification is a 7 digit number
                      </Form.Text>
                    </FloatingLabel>
                    <FloatingLabel
                      label="Permission"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Select
                        onChange={(e) => setNewPermission(e.target.value)}
                        size="sm"
                      >
                        <option>Please select a permission level</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                      label="First Name"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={new_firstName}
                        pattern="[A-Za-z- ]+"
                        placeholder="John"
                        onChange={(e) => setNewFirstName(e.target.value)}
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Last Name"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={new_lastName}
                        pattern="[A-Za-z- ]+"
                        placeholder="Smith"
                        onChange={(e) => setNewLastName(e.target.value)}
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Email Address"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={new_email}
                        placeholder="smith@email.com"
                        pattern="^[a-zA-Z0-9_.-]+@[a-zA-Z]+[\.][a-zA-Z]{2,}$"
                        onChange={(e) => setNewEmail(e.target.value)}
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Phone Number"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={new_phoneNum}
                        onChange={(e) => setNewPhoneNum(e.target.value)}
                        placeholder="123-456-1234"
                        pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Street Address"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={new_address}
                        pattern="^[a-zA-Z0-9- ]+$"
                        placeholder="123 Street"
                        onChange={(e) => setNewAddress(e.target.value)}
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="City"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={new_city}
                        pattern="^[a-zA-Z]+$"
                        placeholder="City name"
                        onChange={(e) => setNewCity(e.target.value)}
                        size="sm"
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
                        value={new_postalCode}
                        placeholder="L9L9L9"
                        pattern="[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]"
                        onChange={(e) => setNewPostalCode(e.target.value)}
                        size="sm"
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      label="Password"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        value={new_password}
                        placeholder="Minimum 8 characters"
                        minLength={8}
                        maxLength={20}
                        onChange={(e) => setNewPassword(e.target.value)}
                        size="sm"
                        aria-describedby="passwordHelp"
                      />
                      <Form.Text id="passwordHelp" muted>
                        Your password must be 8-20 characters long, contain
                        letters and numbers, and must not contain spaces,
                        special characters, or emoji.
                      </Form.Text>
                    </FloatingLabel>
                  </Form.Group>
                  <div className="grid-div">
                    <div className="confirmChange-div item-2">
                      <Button
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

export default ManageAdmin;
