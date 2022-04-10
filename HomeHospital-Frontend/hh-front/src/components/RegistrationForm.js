import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import classes from "./RegistrationForm.module.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { HomeHospitalContext } from "./HomeHospitalContext";

function RegistrationForm() {
  let navigate = useNavigate();

  // useContext to get new Request value
  const { regSuccess } = useContext(HomeHospitalContext);
  const [regSuccessValue, setRegSuccessValue] = regSuccess;

  // Declare React Variables
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emFirstNameValue, setEmFirstNameValue] = useState("");
  const [emLastNameValue, setEmLastNameValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [provinceValue, setProvinceValue] = useState("AB");
  const [genderValue, setGenderValue] = useState("male");
  const [dobValue, setDOBValue] = useState("");
  const [hcValue, setHCValue] = useState("");
  const [postalCodeValue, setPostalCodeValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emPhoneValue, setEmPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [validNameValue, setValidNameValue] = useState(false);
  const [validAddressValue, setValidAddressValue] = useState(false);
  const [validCityValue, setValidCityValue] = useState(false);
  const [validPostalValue, setValidPostalValue] = useState(false);
  const [validPhoneValue, setValidPhoneValue] = useState(false);
  const [validEmailValue, setValidEmailValue] = useState(false);
  const [validHCValue, setValidHCValue] = useState(false);
  const [validPasswordValue, setValidPasswordValue] = useState(false);
  const [validClientFormValue, setValidClientFormValue] = useState(false);
  const [resetAllFormValue] = useState(false);

  // check if the form is valid
  useEffect(() => {
    if (
      validNameValue &&
      validAddressValue &&
      validCityValue &&
      validPostalValue &&
      validPhoneValue &&
      validEmailValue &&
      validPasswordValue &&
      validHCValue
    ) {
      setValidClientFormValue(true);
    } else {
      setValidClientFormValue(false);
    }
  }, [
    validNameValue,
    validHCValue,
    validAddressValue,
    validCityValue,
    validPostalValue,
    validPhoneValue,
    validEmailValue,
    setValidClientFormValue,
    validClientFormValue,
    validPasswordValue,
  ]);

  //   Reset Form function
  useEffect(() => {
    if (resetAllFormValue) {
      document.getElementById("clientForm").reset();
      setLastNameValue("");
      setFirstNameValue("");
      setAddressValue("");
      setPostalCodeValue("");
      setPhoneValue("");
      setEmailValue("");

      document.getElementById("clientName").classList.remove("is-valid");
      document.getElementById("address").classList.remove("is-valid");
      document.getElementById("postalCode").classList.remove("is-valid");
      document.getElementById("telephone").classList.remove("is-valid");
      document.getElementById("email").classList.remove("is-valid");
      document.getElementById("age").classList.remove("is-valid");
    }
  }, [resetAllFormValue]);

  function validateFirstName() {
    const symbols = /[`!@#$%^&*()_+\-=[]{};':"\|,.<>\?~]/;
    const namePattern = new RegExp(symbols);
    const isName = isNaN(firstNameValue);
    if (
      isName === false ||
      firstNameValue === "" ||
      firstNameValue === undefined
    ) {
      document.getElementById("clientFirstName").classList.add("is-invalid");
      document.getElementById("clientFirstName").classList.remove("is-valid");
      setValidNameValue(false);
    } else if (namePattern.test(firstNameValue)) {
      document.getElementById("clientFirstName").classList.add("is-invalid");
      document.getElementById("clientFirstName").classList.remove("is-valid");
      setValidNameValue(false);
    } else {
      document.getElementById("clientFirstName").classList.add("is-valid");
      document.getElementById("clientFirstName").classList.remove("is-invalid");
      setValidNameValue(true);
    }
  }

  function validateLastName() {
    const symbols = /[`!@#$%^&*()_+\-=[]{};':"\|,.<>\?~]/;
    const namePattern = new RegExp(symbols);
    const isName = isNaN(lastNameValue);
    if (
      isName === false ||
      lastNameValue === "" ||
      lastNameValue === undefined
    ) {
      document.getElementById("clientLastName").classList.add("is-invalid");
      document.getElementById("clientLastName").classList.remove("is-valid");
      setValidNameValue(false);
    } else if (namePattern.test(lastNameValue)) {
      document.getElementById("clientLastName").classList.add("is-invalid");
      document.getElementById("clientLastName").classList.remove("is-valid");
      setValidNameValue(false);
    } else {
      document.getElementById("clientLastName").classList.add("is-valid");
      document.getElementById("clientLastName").classList.remove("is-invalid");
      setValidNameValue(true);
    }
  }

  function validateAddress() {
    const pattern = new RegExp("^[a-zA-Z0-9- ]+$");
    if (addressValue === "" || addressValue === undefined) {
      document.getElementById("address").classList.add("is-invalid");
      document.getElementById("address").classList.remove("is-valid");
      setValidAddressValue(false);
    } else if (pattern.test(addressValue)) {
      document.getElementById("address").classList.add("is-valid");
      document.getElementById("address").classList.remove("is-invalid");
      setValidAddressValue(true);
    } else {
      document.getElementById("address").classList.add("is-invalid");
      document.getElementById("address").classList.remove("is-valid");
      setValidAddressValue(false);
    }
  }

  function validateCity() {
    const pattern = new RegExp("^[a-zA-Z0-9- ]+$");
    if (cityValue === "" || cityValue === undefined) {
      document.getElementById("city").classList.add("is-invalid");
      document.getElementById("city").classList.remove("is-valid");
      setValidCityValue(false);
    } else if (pattern.test(cityValue)) {
      document.getElementById("city").classList.add("is-valid");
      document.getElementById("city").classList.remove("is-invalid");
      setValidCityValue(true);
    } else {
      document.getElementById("city").classList.add("is-invalid");
      document.getElementById("city").classList.remove("is-valid");
      setValidCityValue(false);
    }
  }

  function validatePostalCode() {
    const pattern = new RegExp("^[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]$");
    if (pattern.test(postalCodeValue)) {
      document.getElementById("postalCode").classList.add("is-valid");
      document.getElementById("postalCode").classList.remove("is-invalid");
      setValidPostalValue(true);
    } else {
      document.getElementById("postalCode").classList.add("is-invalid");
      document.getElementById("postalCode").classList.remove("is-valid");
      setValidPostalValue(false);
    }
  }

  function validatePhone() {
    // Regex found here https://stackoverflow.com/questions/9776231/regular-expression-to-validate-us-phone-numbers
    const pattern = new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$");
    if (pattern.test(phoneValue)) {
      document.getElementById("telephone").classList.add("is-valid");
      document.getElementById("telephone").classList.remove("is-invalid");
      setValidPhoneValue(true);
    } else {
      document.getElementById("telephone").classList.add("is-invalid");
      document.getElementById("telephone").classList.remove("is-valid");
      setValidPhoneValue(false);
    }
  }

  function validateHCnumber() {
    const pattern = new RegExp("^[0-9]{4}-[0-9]{5}$");
    if (pattern.test(hcValue)) {
      document.getElementById("hcNumber").classList.add("is-valid");
      document.getElementById("hcNumber").classList.remove("is-invalid");
      setValidHCValue(true);
    } else {
      document.getElementById("hcNumber").classList.add("is-invalid");
      document.getElementById("hcNumber").classList.remove("is-valid");
      setValidHCValue(false);
    }
  }

  function validateEmail() {
    const pattern = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
    if (pattern.test(emailValue)) {
      document.getElementById("email").classList.add("is-valid");
      document.getElementById("email").classList.remove("is-invalid");
      setValidEmailValue(true);
    } else {
      document.getElementById("email").classList.add("is-invalid");
      document.getElementById("email").classList.remove("is-valid");
      setValidEmailValue(false);
    }
  }

  function validatePassword() {
    if (passwordValue.length > 7) {
      document.getElementById("password").classList.add("is-valid");
      document.getElementById("password").classList.remove("is-invalid");
    } else {
      document.getElementById("password").classList.add("is-invalid");
      document.getElementById("password").classList.remove("is-valid");
    }
  }

  function confirmPassword() {
    if (passwordValue === confirmPasswordValue) {
      document.getElementById("cPassword").classList.add("is-valid");
      document.getElementById("cPassword").classList.remove("is-invalid");
      setValidPasswordValue(true);
    } else {
      document.getElementById("cPassword").classList.add("is-invalid");
      document.getElementById("cPassword").classList.remove("is-valid");
      setValidPasswordValue(false);
    }
  }

  const createUser = () => {
    Axios.post("http://localhost:4000/api/register", {
      firstName: firstNameValue,
      lastName: lastNameValue,
      streetAddress: addressValue,
      cityName: cityValue,
      provName: provinceValue,
      postalCode: postalCodeValue,
      phoneNumber: phoneValue,
      email: emailValue,
      HCnumber: hcValue,
      gender: genderValue,
      dateOfBirth: dobValue,
      password: passwordValue,
      contactFirstName: emFirstNameValue,
      contactLastName: emLastNameValue,
      contactPhoneNumber: emPhoneValue,
    }).then((response) => {
      setRegSuccessValue(true);
      console.log("Registration Successful");
      navigate("/login");
    });
  };

  return (
    <Container style={{ borderRadius: "0px 50px 0px 0px" }}>
      <div>
        <h3
          className="text-center mt-4"
          style={{ color: "#58adaf", textShadow: "1px 1px #C6C6C6" }}
        >
          Registration
        </h3>
        <hr />
        <form id="clientForm" action="">
          <Row>
            <Col>
              <div>
                <label htmlFor="firstName" className="form-label mt-3 ">
                  Patient First Name
                </label>
                <input
                  onBlur={validateFirstName}
                  type="text"
                  className={`form-control bg-transparent  shadow-none ${classes.noBorder}`}
                  id="clientFirstName"
                  name="clientFirstName"
                  value={firstNameValue}
                  onChange={(e) => setFirstNameValue(e.target.value)}
                  pattern="[A-Za-z- ]+"
                  required
                  placeholder="Enter First Your Name"
                  autoFocus
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please enter a valid First Name
                </div>
              </div>
            </Col>
            <Col>
              <div>
                <label htmlFor="lastName" className="form-label mt-3 ">
                  Patient Last Name
                </label>
                <input
                  onBlur={validateLastName}
                  type="text"
                  className={`form-control bg-transparent  shadow-none ${classes.noBorder}`}
                  id="clientLastName"
                  name="clientLastName"
                  value={lastNameValue}
                  onChange={(e) => setLastNameValue(e.target.value)}
                  pattern="[A-Za-z- ]+"
                  required
                  placeholder="Enter Your Last Name"
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please enter a valid Last Name
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <label htmlFor="address" className="form-label mt-3 ">
                  House/Apartment# and Street Address
                </label>
                <input
                  onBlur={validateAddress}
                  type="text"
                  className={`form-control bg-transparent  shadow-none ${classes.noBorder}`}
                  id="address"
                  name="address"
                  value={addressValue}
                  onChange={(e) => setAddressValue(e.target.value)}
                  pattern="^[a-zA-Z0-9- ]+$"
                  placeholder="Enter Address"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please enter a valid Address
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <div>
                <label htmlFor="City" className="form-label mt-3 ">
                  City
                </label>
                <input
                  onBlur={validateCity}
                  type="text"
                  className={`form-control bg-transparent  shadow-none ${classes.noBorder}`}
                  id="city"
                  name="City"
                  value={cityValue}
                  onChange={(e) => setCityValue(e.target.value)}
                  pattern="^[a-zA-Z]+$"
                  placeholder="Enter City"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please enter a valid City
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div>
                <label htmlFor="Province" className="form-label mt-3 ">
                  Province
                </label>
                <Form.Select
                  aria-label="select province"
                  id="province"
                  name="province"
                  value={provinceValue}
                  onChange={(e) => setProvinceValue(e.target.value)}
                  required
                  className={`bg-transparent  shadow-none ${classes.noBorder}`}
                >
                  <option style={{ color: "black" }} value="AB" defaultChecked>
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
              </div>
            </Col>
            <Col md={4}>
              <div>
                <label htmlFor="postalCode" className="form-label mt-3 ">
                  Postal Code
                </label>
                <input
                  onBlur={validatePostalCode}
                  type="text"
                  className={`form-control bg-transparent  shadow-none ${classes.noBorder}`}
                  id="postalCode"
                  name="postalCode"
                  value={postalCodeValue}
                  onChange={(e) => setPostalCodeValue(e.target.value)}
                  placeholder="L9L9L9"
                  pattern="[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please enter a valid Postal Code eg. T5T5T5
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div>
                <label htmlFor="gender" className="form-label mt-3 ">
                  Gender
                </label>
                <Form.Select
                  aria-label="select gender"
                  id="gender"
                  name="gender"
                  onChange={(e) => setGenderValue(e.target.value)}
                  required
                  value={genderValue}
                  className={`bg-transparent  shadow-none ${classes.noBorder}`}
                >
                  <option
                    style={{ color: "black" }}
                    value="male"
                    defaultChecked
                  >
                    Male
                  </option>
                  <option style={{ color: "black" }} value="female">
                    Female
                  </option>
                  <option style={{ color: "black" }} value="other">
                    Other
                  </option>
                </Form.Select>
              </div>
            </Col>
            <Col md={6}>
              <div>
                <label htmlFor="dob" className="form-label mt-3 ">
                  Date of Birth
                </label>
                <Form.Control
                  id="dob"
                  name="dob"
                  onChange={(e) => setDOBValue(e.target.value)}
                  required
                  className={`bg-transparent  shadow-none ${classes.noBorder}`}
                  type="date"
                  placeholder="Date of Birth"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <label htmlFor="telephone" className="form-label mt-3 ">
                  Telephone
                </label>
                <input
                  onBlur={validatePhone}
                  type="text"
                  className={`form-control bg-transparent  shadow-none ${classes.noBorder}`}
                  id="telephone"
                  name="phone"
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  placeholder="xxx-xxx-xxxx"
                  pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please enter a valid Phone number eg. xxx-xxx-xxxx
                </div>
              </div>
            </Col>
            <Col>
              <div>
                <label htmlFor="hcNumber" className="form-label mt-3 ">
                  Healthcare Number
                </label>
                <input
                  onBlur={validateHCnumber}
                  type="text"
                  className={`form-control bg-transparent  shadow-none ${classes.noBorder}`}
                  id="hcNumber"
                  name="HC"
                  value={hcValue}
                  onChange={(e) => setHCValue(e.target.value)}
                  placeholder="xxxx-xxxxx"
                  pattern="\d{4}[\-]\d{5}"
                  required
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Please enter a valid Healthcare number eg. xxxx-xxxxx
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <label htmlFor="firstName" className="form-label mt-3 ">
                  Emergency Contact First Name
                </label>
                <input
                  type="text"
                  className={`form-control bg-transparent  shadow-none ${classes.noBorder}`}
                  id="emFirstName"
                  name="emFirstName"
                  value={emFirstNameValue}
                  onChange={(e) => setEmFirstNameValue(e.target.value)}
                  pattern="[A-Za-z- ]+"
                  placeholder="Emergency Contact First Name"
                  autoFocus
                />
                <p className={classes.optional}>optional</p>
              </div>
            </Col>
            <Col>
              <div>
                <label htmlFor="lastName" className="form-label mt-3 ">
                  Emergency Contact Last Name
                </label>
                <input
                  type="text"
                  className={`form-control bg-transparent shadow-none ${classes.noBorder}`}
                  id="emLastName"
                  name="emLastName"
                  value={emLastNameValue}
                  onChange={(e) => setEmLastNameValue(e.target.value)}
                  pattern="[A-Za-z]+"
                  placeholder="Emergency Contact Last Name"
                />
                <p className={classes.optional}>optional</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ marginTop: "-20px" }}>
                <label htmlFor="telephone" className="form-label mt-3 ">
                  Emergency Contact Number
                </label>
                <input
                  type="text"
                  className={`form-control bg-transparent  shadow-none ${classes.noBorder}`}
                  id="emTelephone"
                  name="emPhone"
                  value={emPhoneValue}
                  onChange={(e) => setEmPhoneValue(e.target.value)}
                  placeholder="xxx-xxx-xxxx"
                  pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                />
                <p className={classes.optional}>optional</p>
              </div>
            </Col>
          </Row>
          <div>
            <label htmlFor="email" className="form-label mt-3 ">
              Email
            </label>
            <input
              onBlur={validateEmail}
              type="text"
              className={`form-control bg-transparent  shadow-none ${classes.noBorder}`}
              id="email"
              name="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="yourName@gmail.com"
              pattern="^[a-zA-Z0-9_.-]+@[a-zA-Z]+[\.][a-zA-Z]{2,}$"
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">
              Please enter a valid Email eg. John@example.com
            </div>
          </div>
          <div>
            <label htmlFor="password" className="form-label mt-3 ">
              Password
            </label>
            <input
              onBlur={validatePassword}
              type="password"
              className={`form-control bg-transparent  shadow-none ${classes.noBorder}`}
              id="password"
              name="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              placeholder="Password"
              minLength={10}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">
              Password must be minimum of 8 characters
            </div>
          </div>
          <div>
            <label htmlFor="cPassword" className="form-label mt-3 ">
              Confirm Password
            </label>
            <input
              onBlur={confirmPassword}
              type="password"
              className={`form-control bg-transparent  shadow-none ${classes.noBorder}`}
              id="cPassword"
              name="cPassword"
              value={confirmPasswordValue}
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
              placeholder="Confirm Password"
              minLength={10}
              required
            />
            <div className="valid-feedback">Password Match!</div>
            <div className="invalid-feedback">Sorry Passwords Do Not Match</div>
          </div>
          <br />
          <div className="d-grid gap-2">
            <Button
              type="button"
              disabled={!validClientFormValue}
              className={classes.registerButton}
              onClick={createUser}
            >
              Register
            </Button>
          </div>
          <br />
          <div className="d-grid gap-2">
            <Button
              type="submit"
              variant="outline-warning"
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <br />
      <br />
    </Container>
  );
}

export default RegistrationForm;
