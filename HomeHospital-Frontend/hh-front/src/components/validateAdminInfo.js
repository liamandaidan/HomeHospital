export default function validateAdminInfo(values) {
  let errors = {};
  const pattern = new RegExp("^[a-zA-Z0-9- ]+$");

  console.log(values.adminId.length);

  //adminId
  if (!values.adminId) {
    errors.adminId = "Admin id required";
  } else if (values.adminId.length < 7) {
    errors.adminId = "Admin Id invalid, please enter 7 digit id number";
  }

  //permission
  if (!values.permission) {
    errors.permission = "Permission level required";
  }

  //first name
  if (!values.firstName.trim()) {
    errors.firstName = "First name required";
  }

  //last name
  if (!values.lastName.trim()) {
    errors.lastName = "Last name required";
  }

  //email
  const emailpattern = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!values.email) {
    errors.email = "Email required";
  } else if (!emailpattern.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  //phone number
  const phonepattern = new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$");

  if (!values.phoneNum) {
    errors.phoneNum = "Phone number required";
  } else if (!phonepattern.test(values.phoneNum)) {
    errors.email = "Phone number is invalid Example: 111-222-3333";
  }

  //address
  if (!values.address) {
    errors.address = "Address required";
  } else if (!pattern.test(values.address)) {
    errors.address = "Address is invalid";
  }

  //city
  if (!values.city) {
    errors.city = "City required";
  } else if (!pattern.test(values.city)) {
    errors.city = "City is invalid";
  }

  //province
  if (!values.province) {
    errors.province = "Province required";
  }

  //postal code
  const postalpattern = new RegExp("^[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]$");

  if (!values.postalCode) {
    errors.postalCode = "Postal code required";
  } else if (!postalpattern.test(values.postalCode)) {
    errors.postalCode = "Postal code is invalid Example: T1T1T1";
  }

  //password
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password needs to be 8 characters or more";
  }
  //confirm password
  if (!values.confirmPassword) {
    errors.confirmPassword = "Password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  // // pactitionerId
  // if (!values.pactitionerId) {
  //   errors.pactitionerId = "Practitioner id required";
  // } else if (values.adminId.length < 7) {
  //   errors.pactitionerId = 
  //     "Practitioner Id invalid, please enter 7 digit id number";
  // }
  // // role
  // if (!values.role) {
  //   errors.role = "Role required";
  // }

  // // facilityId
  // if (!values.facilityId) {
  //   errors.facilityId = "Facility required";
  // }

  return errors;
}
