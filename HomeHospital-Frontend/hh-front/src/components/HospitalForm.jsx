import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Axios from "axios";
import "../styles/HospitalSelectionStyles.css";

function SelectHospital() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:4000/api/medicalFacility/viewFacilities").then(
      (response) => {
        console.log(response.data);
        setPosts(response.data);
      }
    );
  }, []);

  function test(e) {
    let val = document.getElementById("hospital").value;
    alert("test + " + e.target.value);
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
          {posts.hospitalList?.map((post, key) => (
            <Form>
              <div>
                <h2>{post.hospitalName}</h2>
                <p>{post.waitTime}</p>
                <input
                  type="hidden"
                  id="hospital"
                  value={post.hospitalName}
                ></input>
                <Button id="btn" onClick={test} value={post._id}>Select</Button>
              </div>
            </Form>
          ))}
          {/* {posts.hospitalList?.map(post => <div key={post.wait}>{post.waitTime}</div>)} */}
          {/* {posts.hospitalList?.map(post => <div>{post.}</div>)} */}
        </Row>
      </Container>
    </>
  );
}

export default SelectHospital;
