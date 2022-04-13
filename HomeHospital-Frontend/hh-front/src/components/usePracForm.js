import React, {useState, useEffect, useContext } from 'react'
import axios from "axios"
import { AdminContext } from "./AdminContext";


axios.defaults.withCredentials = true;

const usePracForm = (validate) => {
    const [values, setValues] = useState({
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
        practitionerId: "",
        role: "",
        facilityId: "",
     })
    
    // console.log(values.firstName);
    
    const [errors, setErrors] = useState({})

    const [isSubitting, setIsSubmitting] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        
        
    }

    const handleSubmit = (e) => {
         e.preventDefault();

        setErrors(validate(values))
        setIsSubmitting(true)
    }

    const handleCancel = () => {
        setErrors("")

        values.firstName= "";
        values.lastName= "";
        values.email= "";
        values.phoneNum= "";
        values.address= "";
        values.city= "";
        values.province= "";
        values.postalCode= "";
        values.password= "";
        values.confirmPassword= "";
        values.practitionerId= "";
        values.role = "";
        values.facilityId = "";
    }
    

    return {handleChange, values, handleSubmit, errors, handleCancel }
}

export default usePracForm