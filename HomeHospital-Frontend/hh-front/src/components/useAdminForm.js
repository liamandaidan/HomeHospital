import React, { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
/**
 * Custom hook that is used to validate and set values when creating an new
 * administrator on the admin page
 * @param {*} validate entered admin information
 * @returns handleChange function that changes values
 *          values input values of the create new admin form
 *          handleSubmit checks for errors
 *          handelCancel resets the values
 * @author Robyn Balanag
 */
const useAdminForm = (validate) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    adminId: "",
    permission: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNum: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    password: "",
    confirmPassword: "",
  });
  /**
   * Update the values from the input fields
   * @param {*} e name and value of the input fields
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  /**
   * Send the values from the form and send them to be validated
   * @param {*} e event from submit button
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
  };
  /**
   * Reset all values of the form
   */
  const handleCancel = () => {
    setErrors("");
    values.adminId = "";
    values.permission = 0;
    values.firstName = "";
    values.lastName = "";
    values.email = "";
    values.phoneNum = "";
    values.address = "";
    values.city = "";
    values.province = "";
    values.postalCode = "";
    values.password = "";
    values.confirmPassword = "";
  };

  return { handleChange, values, handleSubmit, errors, handleCancel };
};

export default useAdminForm;
