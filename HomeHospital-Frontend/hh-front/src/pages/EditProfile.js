import React from 'react'
import UserNavBar from '../components/UserNavBar'
import EditPatientForm from '../components/EditPatientForm'
import { Container } from 'react-bootstrap'
/**
 * Page where the patient is able to edit their profile details
 * @returns edit profile page with EditPatientForm component
 */
function EditProfile() {
  return (
    <>
    <UserNavBar />
    <Container>
        <EditPatientForm />
    </Container>
    </>
  )
}

export default EditProfile