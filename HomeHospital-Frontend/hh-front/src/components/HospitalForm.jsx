import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Button, Form, Card } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeHospitalContext } from "./HomeHospitalContext";
import "../styles/HospitalSelectionStyles.css";

function SelectHospital() {
  //useContext here
  const { _id } = useContext(HomeHospitalContext);

  //Declare state variables for hospitalList
  const [hospitals, setHospitals] = useState([]);

  //grab the states of use context for the _id
  const [_idValue, set_idValue] = _id;
  let navigate = useNavigate();

  //This will run on mount and code will execute, makes HTTP call and loads api/data for hospitals
  useEffect(() => {
    Axios.get("http://localhost:4000/api/medicalFacility/viewFacilities")
	.then(
      (response) => {
        console.log(response.data);
        setHospitals(response.data); //Sets data and assigns it to variable hospitals
      })
	  .catch((err) => {
		console.log("Error:" + err);
	  })
  }, []);

  function test(e) {
    //set_idValue(e.target.value);
    alert("Hospital Id = + " + _idValue);
    navigate("/symptoms");
  }


  return (
    <>
      <Container className="hospitalList-container">
        <Row>
          <div className="hospitalList-title">
            <p>Select Hospital</p>
          </div>
        </Row>
        <Row>
          {hospitals.hospitalList?.map((hospital) => (
            <Card style={{ width: "19rem" }} className="text-center" key={hospital._id}>
              <Card.Body >
                <Card.Title>{hospital.hospitalName}</Card.Title>
                <Card.Subtitle></Card.Subtitle>
                <Card.Text >
                  {hospital.address.streetAddress}, {hospital.address.cityName}.
                </Card.Text>
                <Card.Footer className="text-muted">
                  {hospital.waitTime}
                </Card.Footer>
                <Form>
                  <Button
                    id="btn"
                    onClick={(event) => set_idValue(event.target.value)}
                    value={hospital._id}
                  >
                    Select
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          ))}
          <Button onClick={test}>Submit</Button>
        </Row>
      </Container>
    </>
  );
}

export default SelectHospital;
