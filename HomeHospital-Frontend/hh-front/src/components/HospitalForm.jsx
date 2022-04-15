import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Button, Form, Card } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeHospitalContext } from "./HomeHospitalContext";
import "../styles/HospitalSelectionStyles.css";
/**
 * @name SelectHospital
 * @summary this will cover the selection of the hospital to a user request.
 * @returns html component
 */
function SelectHospital() {
  //useContext here
  const { _id, longitude, latitude } = useContext(HomeHospitalContext);

  //useState for empty array, used for grabbing and setting data from backend
  const [posts, setPosts] = useState([]);

  //grab the states of use context for the _id
  const [_idValue, set_idValue] = _id;
  const [longitudeValue, setLongitudeValue] = longitude;
  const [latitudeValue, setLatitudeValue] = latitude;

  let navigate = useNavigate();

  /**
   * Axios.get grabs data from backend through route
   * @returns data for hospitals from backend
   */
  useEffect(() => {
    Axios.get("http://localhost:4000/api/medicalFacility/viewFacilities").then(
      (response) => {
        setPosts(response.data);
      }
    );
  }, []);
  /**
   * @function test used to navigate to symptoms
   * @param {event} e event to be passed in from component.
   */
  function test(e) {
    navigate("/symptoms");
  }
  /**
   * @function cancelRequest used to cancel requests
   */
  const cancelRequest = () => {
    navigate("/home");
  };
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
                  <Card.Text className="card-text">
                    {post.phoneNumber}
                  </Card.Text>
                  <Card.Text className="card-text">
                    <strong>{post.waitTime}</strong>
                  </Card.Text>
                  <Form key={post._id}>
                    <Button
                      id="btn"
                      className="selectHospital-btn"
                      onClick={() => {
                        set_idValue(post._id);
                        setLatitudeValue(post.latitude);
                        setLongitudeValue(post.longitude);
                      }}
                    >
                      Select hospital
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            ))}
          </div>
          <div className="submit-btn-div">
            <Button className="submit-btn" onClick={test}>
              Submit hospital
            </Button>
            <div className="cancel-link-div">
              <Button variant="link" onClick={cancelRequest}>
                Cancel request
              </Button>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default SelectHospital;
