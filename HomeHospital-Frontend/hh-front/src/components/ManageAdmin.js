import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Table,
  Modal,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { AdminContext } from "./AdminContext";
import axios from "axios";
import useAdminForm from "./useAdminForm"
import validateAdmin from "./validateAdminInfo"

axios.defaults.withCredentials = true;
/**
 * Display the administrator component where the user will be able to 
 * edit, delete and create a new admin. 
 * @returns list of admins, edit screen with user information, new admin 
 *          creation form.  
 * @author Robyn Balanag
 */
function ManageAdmin() {
  const [modalState, setModalState] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [editDisplay, setEditDisplay] = useState(false);
  const [userDisplay, setUserDisplay] = useState(true);
  const [createDisplay, setCreateDisplay] = useState(false);
  const [displayUserType, setDisplayUserType] = useState(true);
  const [adminLlist, setAdminList] = useState([]);
  const { userTypeSelection, confirmCreate } = useContext(AdminContext);
  const [userType, setUserType] = userTypeSelection;
  const [confirm, setConfirm] = confirmCreate;
 /**
  * Admin information
  */
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [prov, setProv] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [adminId, setAdminId] = useState("");
  const [permissionLevel, setPermissionLevel] = useState("");
  /**
   * Import to validate user input to create a new admin
   */
  const { handleChange, values, handleCancel, handleSubmit, errors } = useAdminForm(validateAdmin);
  /**
   * Load lists of administrators from the database
   * and set to an array of patients
   */
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/adminList")
      .then((response) => {
        //console.log(response);
        setAdminList(response.data);
      })
      .catch((err) => {
       // console.log(err);
      });
  }, []);
  /**
   * Alert model that will be displayed when a user is selected to be deleted. The user
   * must confirm before proceeding
   * @param {*} props user information
   * @returns alert modal when the user is selected to be deleted from the database
   */
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
  /**
   * Reaload list of administrators once a change has been made
   * and set to an array of admins
   */
  const loadAdmins = () => {
    axios
    .get("http://localhost:4000/api/admin/adminList")
    .then((response) => {
      //console.log(response);
      setAdminList(response.data);
    })
    .catch((err) => {
      //console.log(err);
    });
  }
  /**
   * Set the selected admin's details to display in the edit form. Then will display
   * the edit form and hide the list of admins
   * @param {*} e admin id that has been selected to edit
   */
  const selectEdit = (e) => {
    setUserDisplay(false);
    setEditDisplay(true);
    setCreateDisplay(false);

    {
      adminLlist.map((admin) => {
        if (admin.adminId === e) {
          setAdminId(admin.adminId);
          setFirstName(admin.user.firstName);
          setLastName(admin.user.lastName);
          setEmail(admin.email);
          setPhoneNum(admin.user.phoneNumber);
          setAddress(admin.user.address.streetAddress);
          setCity(admin.user.address.cityName);
          setProv(admin.user.address.provName);
          setPostalCode(admin.user.address.postalCode);
          setPermissionLevel(admin.permissions);
          setId(admin._id);
          
        }
      });
    }
  };
  /**
   * Set the selected admin as the selected user to delete
   * @param {*} e admin id that will be deleted
   */
  const handleDelete = (e) => {
    {
      adminLlist.map((admin) => {
        //console.log("this is the admin " + admin._id)
        if (admin.adminId === e) {
          setSelectedUser(admin._id);
          setSelectedUserName(admin.user.firstName);
          setModalState(true);
        }
      });
    }
  };
  /**
    * Once the user has confirmed they want to delete the admin from the
    * modal, the admin's id will be sent to the database to be deleted
    */
  const confirmDelete = () => {
    const deleteRoute = "http://localhost:4000/api/admin/admin/";

    axios
    .delete( deleteRoute + selectedUser, {
      withCredentials: true,
    })
    .then((response) => {
      loadAdmins();
    })
    .catch((err) => {
     // console.log(err);
    })

    setModalState(false)
  };
  /**
   * Once the user has canceled from the create admin form, it will reset the 
   * selected admin's information and close the edit form to display the 
   * list of admins
   */
  const showUserList = () => {
    
    handleCancel();

    setCreateDisplay(false);
    setEditDisplay(false);
    setUserDisplay(true);
  };
  /**
   * Diplay the create admin form and hide all other windows
   */
  const showCreate = () => {
    setCreateDisplay(true);
    setUserDisplay(false);
    setEditDisplay(false);
  };
  /**
   * Create a ref so when the user submits a form with errors they 
   * will be take back to the top of the form
   */
  const myRef = useRef(null)
  const executeScroll = () => myRef.current.scrollIntoView()  
  /**
   * Check the list of errors within the form, is there are no more 
   * errors, it will send a request to create a new administrator
   */
  useEffect(() => {
    if(Object.keys(errors).length === 0 ) {
        axios
        .post("http://localhost:4000/api/registerA/", {
          withCredentials: true,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          email: values.email,
          streetAddress: values.address,
          cityName: values.city,
          provName: values.province,
          postalCode: values.postalCode,
          phoneNumber: values.phoneNum,
          adminId: values.adminId,
          permissionLevel: values.permission,
        })
        .then((response) => {
          //console.log(response);
          setCreateDisplay(false);
          setUserDisplay(true);
          loadAdmins();
        })
        .catch((err) => {
          //console.log(err);
        });
    } else{
      executeScroll()
    }
}, [errors])
  /**
   * Once the user has made changes to the admin details, they will confirm the
   * changes and the information will get updated in the database. If it is 
   * successfull, they will be taken back to the list of admins
   * @param {*} idToChange admin id that is edited 
   */
  const confirmChanges = (idToChange) => {
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
      loadAdmins();
    })
    .catch((err) => {
      //console.log(err);
    })

    setEditDisplay(false);
    setUserDisplay(true);

  }

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
                        <option defaultValue>{permissionLevel}</option>
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
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        size="sm"
                        maxLength={15}
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
                        maxLength={15}
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
                        maxLength={30}
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
                        onClick={(e) => handleDelete(adminId)}
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
                <Form onSubmit={handleSubmit} id="createUserForm">
                  <Form.Group>
                  <FloatingLabel
                      label="Admin Identification Number"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.adminId}
                        onChange={handleChange}
                        size="sm"
                        aria-describedby="permissionsHelp"
                        name="adminId"
                        ref={myRef}
                      />
                      <Form.Text id="permissionsHelp" muted>
                        The admin identification is a 7 digit number
                      </Form.Text>
                      {errors.adminId && <p>{errors.adminId}</p>}
                    </FloatingLabel>
                    <FloatingLabel
                      label="Permission"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Select
                        defaultValue={values.permission}
                        onChange={handleChange}
                        name="permission"
                        size="sm"
                      >
                        <option>Please select a permission level</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </Form.Select>
                    </FloatingLabel>
                    {errors.permission && <p>{errors.permission}</p>}
                    <FloatingLabel
                      label="First Name"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.firstName}
                        onChange={handleChange}
                        name="firstName"
                        placeholder="John"
                        size="sm"
                        maxLength={25}
                      />
                    </FloatingLabel>
                    {errors.firstName && <p>{errors.firstName}</p>}
                    <FloatingLabel
                      label="Last Name"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.lastName}
                        onChange={handleChange}
                        name="lastName"
                        placeholder="Smith"
                        size="sm"
                        maxLength={25}
                      />
                    </FloatingLabel>
                    {errors.lastName && <p>{errors.lastName}</p>}
                    <FloatingLabel
                      label="Email Address"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.email}
                        placeholder="smith@email.com"
                        onChange={handleChange}
                        name="email"
                        size="sm"
                      />
                    </FloatingLabel>
                    {errors.email && <p>{errors.email}</p>}
                    <FloatingLabel
                      label="Phone Number"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.phoneNum}
                        onChange={handleChange}
                        placeholder="123-456-1234"
                        name="phoneNum"
                        size="sm"
                      />
                    </FloatingLabel>
                    {errors.phoneNum && <p>{errors.phoneNum}</p>}
                    <FloatingLabel
                      label="Street Address"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.address}
                        placeholder="123 Street"
                        onChange={handleChange}
                        name="address"
                        size="sm"
                        maxLength={50}
                      />
                    </FloatingLabel>
                    {errors.address && <p>{errors.address}</p>}

                    <FloatingLabel
                      label="City"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.city}
                        placeholder="City name"
                        onChange={handleChange}
                        name="city"
                        size="sm"
                        maxLength={25}
                      />
                    </FloatingLabel>
                    {errors.city && <p>{errors.city}</p>}
                    <FloatingLabel
                      label="Province"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Select
                        name="province"
                        defaultValue={values.province}
                        onChange={handleChange}
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
                    {errors.province && <p>{errors.province}</p>}
                    <FloatingLabel
                      label="Postal Code"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.postalCode}
                        placeholder="L9L9L9"
                        onChange={handleChange}
                        name="postalCode"
                        size="sm"
                      />
                    </FloatingLabel>
                    {errors.postalCode && <p>{errors.postalCode}</p>}
                    <FloatingLabel
                      label="Password"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.password}
                        placeholder="Minimum 8 characters"
                        minLength={8}
                        maxLength={20}
                        onChange={handleChange}
                        name="password"
                        size="sm"
                        aria-describedby="passwordHelp"
                        type="password"
                      />
                      <Form.Text id="passwordHelp" muted>
                        Your password must be 8-20 characters long, contain
                        letters and numbers, and must not contain spaces,
                        special characters, or emoji.
                      </Form.Text>
                    </FloatingLabel>
                    {errors.password && <p>{errors.password}</p>}
                    <FloatingLabel
                      label="Confirm Password"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.confirmPassword}
                        placeholder="Minimum 8 characters"
                        minLength={8}
                        maxLength={20}
                        onChange={handleChange}
                        name="confirmPassword"
                        size="sm"
                        aria-describedby="passwordHelp"
                        type="password"
                      />
                  </FloatingLabel>
                  {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                  </Form.Group>
                  <div className="grid-div">
                    <div className="confirmChange-div item-2">
                      <Button
                        className="confirmChange-btn"
                        type="submit"
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
