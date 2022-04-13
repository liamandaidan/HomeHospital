/**
 * This component will check the values from the create new admin form and 
 * send a list of errors if any of the values are invalid
 * @param {*} values values received from the create new admin form
 * @returns a list of errors 
 * @author Robyn Balaanag
 */
export default function validateAdminInfo(values) {
  let errors = {};
  const pattern = new RegExp("^[a-zA-Z0-9- ]+$");
  /**
   * checks if the admin id entered is valid
   */
  if (!values.adminId) {
    errors.adminId = "Admin id required";
  } else if (values.adminId.length < 7) {
    errors.adminId = "Admin Id invalid, please enter 7 digit id number";
  }
  /**
   * checks if the permission entered is valid
   */
  if (!values.permission) {
    errors.permission = "Permission level required";
  }
  /**
   * checks if the first name entered is valid
   */
  if (!values.firstName.trim()) {
    errors.firstName = "First name required";
  }
  /**
   * checks if the last anme entered is valid
   */
  if (!values.lastName.trim()) {
    errors.lastName = "Last name required";
  }
  /**
   * checks if the email entered is valid
   */
  const emailpattern = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!values.email) {
    errors.email = "Email required";
  } else if (!emailpattern.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  /**
   * checks if the phone number entered is valid
   */
  const phonepattern = new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$");

  if (!values.phoneNum) {
    errors.phoneNum = "Phone number required";
  } else if (!phonepattern.test(values.phoneNum)) {
    errors.email = "Phone number is invalid";
  }
  /**
   * checks if the address entered is valid
   */
  if (!values.address) {
    errors.address = "Address required";
  } else if (!pattern.test(values.address)) {
    errors.address = "Address is invalid";
  }
  /**
   * checks if the city entered is valid
   */
  if (!values.city) {
    errors.city = "City required";
  } else if (!pattern.test(values.city)) {
    errors.city = "City is invalid";
  }
  /**
   * checks if the province entered is valid
   */
  if (!values.province) {
    errors.province = "Province required";
  }
  /**
   * checks if the postal code entered is valid
   */
  const postalpattern = new RegExp("^[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]$");

  if (!values.postalCode) {
    errors.postalCode = "Postal code required";
  } else if (!postalpattern.test(values.postalCode)) {
    errors.postalCode = "Postal code is invalid";
  }
  /**
   * checks if the password entered valid
   */
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password needs to be 8 characters or more";
  }
  /**
   * checks if the password entered matches 
   */
  if (!values.confirmPassword) {
    errors.confirmPassword = "Password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
