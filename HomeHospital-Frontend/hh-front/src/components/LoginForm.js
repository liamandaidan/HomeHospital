import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import classes from "./LoginForm.module.css";

function LoginForm() {
  // Declare React Variables
  const [nameValue, setNameValue] = useState("");
  const [addressValue, setAddressValue] = useState("");
  const [postalCodeValue, setPostalCodeValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [validNameValue, setValidNameValue] = useState(false);
  const [validAddressValue, setValidAddressValue] = useState(false);
  const [validPostalValue, setValidPostalValue] = useState(false);
  const [validPhoneValue, setValidPhoneValue] = useState(false);
  const [validEmailValue, setValidEmailValue] = useState(false);
  const [validPasswordValue, setValidPasswordValue] = useState(false);
  const [validClientFormValue, setValidClientFormValue] = useState(false);
  const [resetAllFormValue, setResetAllFormValue] = useState(false);

  // check if the form is valid
  useEffect(() => {
    if (
      validNameValue &&
      validAddressValue &&
      validPostalValue &&
      validPhoneValue &&
      validEmailValue &&
      validPasswordValue
    ) {
      setValidClientFormValue(true);
    } else {
      setValidClientFormValue(false);
    }
  }, [
    validNameValue,
    validAddressValue,
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
      setNameValue("");
      setAddressValue("");
      setPostalCodeValue("");
      setPhoneValue("");
      setEmailValue("");

      document.getElementById("clientName").classList.remove("is-valid");
      document.getElementById("address").classList.remove("is-valid");
      document.getElementById("postalCode").classList.remove("is-valid");
      document.getElementById("telephone").classList.remove("is-valid");
      document.getElementById("email").classList.remove("is-valid");
    }
  }, [resetAllFormValue]);

  function validateName() {
    const symbols = /[`!@#$%^&*()_+\-=[]{};':"\|,.<>\?~]/;
    const namePattern = new RegExp(symbols);
    const isName = isNaN(nameValue);
    if (isName === false || nameValue === "" || nameValue === undefined) {
      document.getElementById("clientName").classList.add("is-invalid");
      document.getElementById("clientName").classList.remove("is-valid");
      setValidNameValue(false);
    } else if (namePattern.test(nameValue)) {
      document.getElementById("clientName").classList.add("is-invalid");
      document.getElementById("clientName").classList.remove("is-valid");
      setValidNameValue(false);
    } else {
      document.getElementById("clientName").classList.add("is-valid");
      document.getElementById("clientName").classList.remove("is-invalid");
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

  function validateEmail() {
    const pattern = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z]+[.][a-zA-Z]{2,}$");
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
    if (passwordValue.length > 5) {
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

  return (
    <Container className={`mt-5 p-5 ${classes.rightSide}`}>
      <form id="clientForm" action="">
        <div>
          <label htmlFor="firstName" className="form-label mt-3 text-white">
            Client Name
          </label>
          <input
            onBlur={validateName}
            type="text"
            className={`form-control bg-transparent text-white shadow-none ${classes.noBorder}`}
            id="clientName"
            name="clientName"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            pattern="[A-Za-z- ]+"
            required
            placeholder="Enter Your Name"
            autoFocus
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Please enter a valid Name</div>
        </div>
        <div>
          <label htmlFor="address" className="form-label mt-3 text-white">
            Address
          </label>
          <input
            onBlur={validateAddress}
            type="text"
            className={`form-control bg-transparent text-white shadow-none ${classes.noBorder}`}
            id="address"
            name="address"
            value={addressValue}
            onChange={(e) => setAddressValue(e.target.value)}
            pattern="^[a-zA-Z0-9- ]+$"
            placeholder="Enter Address"
            required
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Please enter a valid Address</div>
        </div>
        <div>
          <label htmlFor="postalCode" className="form-label mt-3 text-white">
            Postal Code
          </label>
          <input
            onBlur={validatePostalCode}
            type="text"
            className={`form-control bg-transparent text-white shadow-none ${classes.noBorder}`}
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
        <div>
          <label htmlFor="telephone" className="form-label mt-3 text-white">
            Telephone
          </label>
          <input
            onBlur={validatePhone}
            type="text"
            className={`form-control bg-transparent text-white shadow-none ${classes.noBorder}`}
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
        <div>
          <label htmlFor="email" className="form-label mt-3 text-white">
            Email
          </label>
          <input
            onBlur={validateEmail}
            type="text"
            className={`form-control bg-transparent text-white shadow-none ${classes.noBorder}`}
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
          <label htmlFor="password" className="form-label mt-3 text-white">
            Password
          </label>
          <input
            onBlur={validatePassword}
            type="password"
            className={`form-control bg-transparent text-white shadow-none ${classes.noBorder}`}
            id="password"
            name="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            placeholder="Password"
            minLength={6}
            required
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">
            Password must be minimum of 6 characters
          </div>
        </div>
        <div>
          <label htmlFor="cPassword" className="form-label mt-3 text-white">
            Confirm Password
          </label>
          <input
            onBlur={confirmPassword}
            type="password"
            className={`form-control bg-transparent text-white shadow-none ${classes.noBorder}`}
            id="cPassword"
            name="cPassword"
            value={confirmPasswordValue}
            onChange={(e) => setConfirmPasswordValue(e.target.value)}
            placeholder="Confirm Password"
            minLength={5}
            required
          />
          <div className="valid-feedback">Password Match!</div>
          <div className="invalid-feedback">Sorry Passwords Do Not Match</div>
        </div>
        <br />
        <div className="d-grid gap-2">
          <Button
            type="submit"
            disabled={!validClientFormValue}
            className={classes.registerButton}
          >
            Register
          </Button>
        </div>
        <br />
        <div className="d-grid gap-2">
          <Button type="submit" variant="outline-warning">
            Cancel
          </Button>
        </div>
      </form>
      <br />
      <br />
    </Container>
  );
}

export default LoginForm;
