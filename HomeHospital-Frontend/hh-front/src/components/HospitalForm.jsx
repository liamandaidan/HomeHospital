import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeHospitalContext } from "./HomeHospitalContext";
import "../styles/HospitalSelectionStyles.css";

function SelectHospital() {
  //useContext here
  const { _id, patient_id } = useContext(HomeHospitalContext);
  const [patientID, setPatientID] = patient_id;

  console.log("PatientID: " + patientID)

  const [posts, setPosts] = useState([]);
  //grab the states of use context for the _id
  const [_idValue, set_idValue] = _id;
  let navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:4000/api/medicalFacility/viewFacilities").then(
      (response) => {
        console.log(response.data);
        setPosts(response.data);
      }
    );
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
          <div>
            <p>Please select the hospital you would like to visit</p>
          </div>
        </Row>
        <Row>
          <div className="hospitalCards-div">
            {posts.hospitalList?.map((post, index) => (
                <Card
                  style={{ width: "35rem" }}
                  className="text-center"
                  key={index}
                >
                  <Card.Body className="card-contents">
                    <Card.Title>{post.hospitalName}</Card.Title>
                    <Card.Subtitle>
                      {post.address.streetAddress}, {post.address.cityName}
                    </Card.Subtitle>
                    <Card.Text className="card-text">{post.waitTime}</Card.Text>
                    <Form key={post._id}>
                      <Button
                    id="btn"
                    onClick={(event) => set_idValue(event.target.value)}
                    value={post._id}
                  >
                    Select
                  </Button>
                  </Form>
                  </Card.Body>
                </Card>

            ))}
          </div>
          <div className="submit-btn-div">
            <Button className="submit-btn" onClick={test}>
              Submit
            </Button>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default SelectHospital;
