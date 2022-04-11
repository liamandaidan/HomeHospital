import React from 'react'
import UserNavBar from '../components/UserNavBar'
import EditPatientForm from '../components/EditPatientForm'
import { Container } from 'react-bootstrap'

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