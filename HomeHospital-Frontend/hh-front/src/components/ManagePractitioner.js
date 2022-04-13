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
import usePracForm from "./usePracForm"
import validate from "./validatePracInfo"

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

  const [hospitals, setHospitals] = useState([]);

  const [updatedPrac, setUpdatedPrac] = useState(false);

  //import function from useForm
  const { handleChange, values, handleCancel, handleSubmit, errors } = usePracForm(validate);

  console.log(errors.length)

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
  }, [])

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


  //load all pracs
  const loadPracs = () => {
    axios
    .get("http://localhost:4000/api/admin/practitionerList")
    .then((response) => {
      console.log(response);
      setPractitionerList(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

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
          setPractitionerId(prac.practitionerId);
          setFacilityId(prac.facilityId);
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
      loadPracs();
    })
    .catch((err) => {
      console.log(err);
    })

    setModalState(false);
  };

  //confirm changes made to user profile
  const confirmChanges = (idToChange) => {

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
      loadPracs();
    })
    .catch((err) => {
      console.log(err);
    })

    setEditDisplay(false);
    setUserDisplay(true);

  }

  //show list of practitioners when you close the edit window
  const showUserList = () => {
    handleCancel();

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



    //this will check if there are no errors in the form, if no errors remain the form will be submitted
    useEffect(() => {
      if(Object.keys(errors).length === 0 ) {
          axios
          .post("http://localhost:4000/api/registerP/", {
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
            practitionerId: values.practitionerId,
            role: values.role,
            facilityId: values.facilityId,
          })
          .then((response) => {
            console.log(response);
            setUpdatedPrac(true);
            setCreateDisplay(false);
            setUserDisplay(true);
            loadPracs();
  
          })
          .catch((err) => {
            console.log(err);
          });
      }
  }, [errors])


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
                            <option defaultChecked>{hospital.hospitalName}</option>
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
                <Form onSubmit={handleSubmit} id="createUserForm">
                  <Form.Group>
                    <FloatingLabel
                      label="Role"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Select
                        defaultValue={values.role}
                        onChange={handleChange}
                        size="sm"
                        name="role"
                      >
                        <option>Please select a role</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Clerk">Clerk</option>
                      </Form.Select>
                    </FloatingLabel>
                    {errors.role && <p>{errors.role}</p>}
                    <FloatingLabel
                       
                      label="Practitioner Id"
                      controlId="floatingInput idHelp"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.practitionerId}
                        onChange={handleChange}
                        placeholder="12345678"
                        size="sm"
                        min={7}
                        name="practitionerId"
                      />
                       <Form.Text id="idHelp" muted>
                        The practitioner identification is a 7 digit number
                      </Form.Text>
                    </FloatingLabel>
                    {errors.practitionerId && <p>{errors.practitionerId}</p>}

                    <FloatingLabel
                      label="First Name"
                      controlId="floatingInput"
                      className="mb-3"
                      >
                      <Form.Control
                        defaultValue={values.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        size="sm"
                        name="firstName"
                         
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
                        placeholder="Smith"
                        size="sm"
                        name="lastName"
                         
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
                        onChange={handleChange}
                        placeholder="smith@email.com"
                        size="sm"
                        name="email"
                         
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
                        size="sm"
                        name="phoneNum"
                         
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
                        onChange={handleChange}
                        placeholder="123 Street"
                        size="sm"
                        name="address"
                         
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
                        onChange={handleChange}
                        placeholder="City name"
                        size="sm"
                        name="city"
                         
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
                        onChange={handleChange}
                        placeholder="L9L9L9"
                        size="sm"
                        name="postalCode"
                         
                      />
                    </FloatingLabel>
                    {errors.postalCode && <p>{errors.postalCode}</p>}

                    <FloatingLabel
                      label="Facility"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Select
                        defaultValue={values.facilityId}
                        onChange={handleChange}
                        name="facilityId"
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
                    {errors.facilityId && <p>{errors.facilityId}</p>}

                    <FloatingLabel
                      label="Password"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.password}
                        onChange={handleChange}
                        placeholder="Minimum 10 characters"
                        size="sm"
                        name="password"
                         
                      />
                    </FloatingLabel>
                    {errors.password && <p>{errors.password}</p>}

                    <FloatingLabel
                      label="Confirm Password"
                      controlId="floatingInput"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={values.confirmPassword}
                        onChange={handleChange}
                        placeholder="Minimum 10 characters"
                        size="sm"
                        aria-describedby="passwordHelp"
                        name="confirmPassword"
                         
                      />
                    <Form.Text id="passwordHelp" muted>
                        Your password must be 8-20 characters long, contain
                        letters and numbers, and must not contain spaces,
                        special characters, or emoji.
                      </Form.Text>
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

export default ManagePractitioner;
