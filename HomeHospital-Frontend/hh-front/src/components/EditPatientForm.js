import React, { useState, useEffect } from "react";
import { Form, FormGroup, FormLabel, FloatingLabel , Button, FormSelect, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "../styles/editprofile.css";

axios.defaults.withCredentials = true;

function EditPatientForm() {

  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [hCNum, setHCNum] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [prov, setProv] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergFirstName, setEmergFirstName] = useState("");
  const [emergLastName, setEmergLastName] = useState("");
  const [emergNum, setEmergNum] = useState("");

  const navigate = useNavigate();

  moment.locale("en");

  //get user information
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users/patientInfo", {
        withCredentials: true,
      })
      .then((response) => {
        setId(response.data.id);
        setFirstName(response.data.user.firstName);
        setLastName(response.data.user.lastName);
        setEmail(response.data.email);
        setHCNum(response.data.HCnumber);
        setGender(response.data.gender);
        setDOB(response.data.dateOfBirth);
        setPhoneNumber(response.data.user.phoneNumber);
        setAddress(response.data.user.address.streetAddress);
        setCity(response.data.user.address.cityName);
        setProv(response.data.user.address.provName);
        setPostalCode(response.data.user.address.postalCode);
        setEmergFirstName(response.data.emergencyContact.firstName);
        setEmergLastName(response.data.emergencyContact.lastName);
        setEmergNum(response.data.emergencyContact.phoneNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //update user information
  const handleUpdate = () => {
    axios
      .post("http://localhost:4000/api/users/modifyPatientInfo", {
        patientId: id,
        email: email,
        HCnumber: hCNum,
        gender: gender,
        dateOfBirth: DOB,
        user: {
          firstName: firstName,
          lastName: lastName,
          address: {
            streetAddress: address,
            cityName: city,
            provName: prov,
            postalCode: postalCode,
          },
          phoneNumber: phoneNumber,
        },
        emergencyContact: {
          firstName: emergFirstName,
          lastName: emergLastName,
          phoneNumber: emergNum,
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateFirstName=()=>{
      if(firstName === ""){
          alert("Please enter first name")
      }
  }
  const validateLastName=()=>{
      if(lastName === ""){
          alert("Please enter last name")
      }
  }
  const validateEmail=()=>{
    const pattern = new RegExp(
        "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])");
      if(email === ""){
          alert("Please enter an email!")
      } else if (!pattern.test(email)) {
            alert("Please enter a valid email. Example: smith@email.com")
      }
  }
  const validateHCnumber=()=>{
    const pattern = new RegExp("^[0-9]{4}-[0-9]{5}$");
    if(hCNum === ""){
        alert("Please enter your health number")
    } else if(!pattern.test(hCNum)) {
        alert("Please enter a valid health care number. Example: 1111-22222")
    }
}
  const validateAddress=()=>{
    if(address === ""){
        alert("Please enter your health number")
    }
}
  const validatePhoneNum=()=>{
    const pattern = new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$");
    if(phoneNumber === ""){
        alert("Please enter you phone number")
    } else if (!pattern.test(phoneNumber)) {
        alert("Please enter a valid phone number. Example: 111-222-3333")
    }
}
  const validateCity=()=>{
    if(city === ""){
        alert("Please enter your health number")
    }
}
  const validatePostalCode=()=>{
    const pattern = new RegExp("^[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]$");
    if(postalCode === ""){
        alert("Please enter your health number")
    } else if(!pattern.test(postalCode)) {
        alert("Please enter a valid postal code. Example: T1T1T1")
    }
}


  return (
    <Container className="container-editpatient">
        <h2>Edit Profile</h2><br />
      <Form>
        <FormGroup>
          <FloatingLabel
            controlId="floatingInput"
            label="First Name"
            className="mb-3"
          >
            <Form.Control
            onBlur={validateFirstName}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Last Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onBlur={validateLastName}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onBlur={validateEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Health Care Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onblur={validateHCnumber}
              value={hCNum}
              onChange={(e) => setHCNum(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Gender"
            value={gender}
            className="mb-3"
          >
            <FormSelect onChange={(e) => setGender(e.target.value)}>
              {gender === "Male" ? (
                <>               
                <option select value="Male">
                  Male
                </option>
                <option value="Female">Female</option>
                </>
              ) : (
                <>       
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                </>
              )}
            </FormSelect>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Date of Birth"
            className="mb-3"
          >
            <Form.Control
              type="date"
              value={moment(DOB).format("YYYY-MM-DD")}
              onChange={(e) => setDOB(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Phone Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onBlur={validatePhoneNum}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Street Address"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onBlur={validateAddress}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="City"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onBlur={validateCity}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Province"
            className="mb-3"
          >
            <Form.Select
              aria-label="select province"
              id="province"
              name="province"
              value={prov}
              onChange={(e) => setProv(e.target.value)}
              required
            >
              <option>{prov}</option>
              <option style={{ color: "black" }} value="AB">
                AB
              </option>
              <option style={{ color: "black" }} value="BC">
                BC
              </option>
              <option style={{ color: "black" }} value="NB">
                NB
              </option>
              <option style={{ color: "black" }} value="NL">
                NL
              </option>
              <option style={{ color: "black" }} value="NT">
                NT
              </option>
              <option style={{ color: "black" }} value="NS">
                NS
              </option>
              <option style={{ color: "black" }} value="NU">
                NU
              </option>
              <option style={{ color: "black" }} value="ON">
                ON
              </option>
              <option style={{ color: "black" }} value="PE">
                PE
              </option>
              <option style={{ color: "black" }} value="QC">
                QC
              </option>
              <option style={{ color: "black" }} value="SK">
                SK
              </option>
              <option style={{ color: "black" }} value="YT">
                YT
              </option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Postal Code"
            className="mb-3"
          >
            <Form.Control
              type="text"
              onBlur={validatePostalCode}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Emergency Contact First Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={emergFirstName === null && "No information provided"}
              onChange={(e) => setEmergFirstName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Emergency Contact Last Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={emergLastName === null && "No information provided"}
              onChange={(e) => setEmergLastName(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Emergency Contact Phone Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={emergNum === null && "No information provided"}
              onChange={(e) => setEmergNum(e.target.value)}
            />
          </FloatingLabel>
        </FormGroup>
      </Form>
      <div className="footer-editpatient-grid">
        <div className="item-1">
      <Button onClick={handleUpdate} className="submit-btn">Submit</Button>
        </div>
      <div className="item-2">
      <a href="/home">Return to homepage</a>
      </div>
      </div>
    </Container>
  );
}

export default EditPatientForm;
