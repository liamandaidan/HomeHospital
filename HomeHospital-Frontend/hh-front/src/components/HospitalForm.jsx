import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import Axios from "axios";
import { renderMatches, useNavigate } from "react-router-dom";
import { HomeHospitalContext } from "./HomeHospitalContext";
import "../styles/HospitalSelectionStyles.css";

function SelectHospital() {
  //useContext here
  const { _id } = useContext(HomeHospitalContext);

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
        </Row>
        <Row>
          {posts.hospitalList?.map((post , index) => (
            <Card  key={index} style={{ width: "19rem" }} className="text-center">
              <Card.Body>
                <Card.Title>{post.hospitalName}</Card.Title>
                <Card.Subtitle></Card.Subtitle>
                <Card.Text>
                  {post.address.streetAddress}, {post.address.cityName}.
                </Card.Text>
                <Card.Footer className="text-muted">
                  {post.waitTime}
                </Card.Footer>
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
          <Button onClick={test}>Submit</Button>
        </Row>
      </Container>
    </>
  );
}

export default SelectHospital;
