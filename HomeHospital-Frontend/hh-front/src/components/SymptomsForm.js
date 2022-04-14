import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SymptomForm.css";
import { HomeHospitalContext } from "./HomeHospitalContext";

axios.defaults.withCredentials = true;

function SymptomsForm() {
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [modalState, setModalState] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const { _id, newRequest, requestSuccess } = useContext(HomeHospitalContext);
  const [hospitalID] = _id;
  const [newRequestValue, setNewRequestValue] = newRequest;
  const [requestSuccessValue, setRequestSuccessValue] = requestSuccess;

  const navigate = useNavigate();

  console.log("this is the hospital ID: " + hospitalID);

  const [symptomsList, setSymptomsList] = useState([
    {
      description: "",
      severity: "",
    },
  ]);

  // console.log(symptomsList);
  // console.log(additionalInfo);

  //this function will be add a new symptom field as long as the previous fields have been filled.
  const handleSymptomsAdd = (index) => {
    if (
      symptomsList[index].description !== "" &&
      symptomsList[index].severity !== ""
    ) {
      setSymptomsList([
        ...symptomsList,
        {
          description: "",
          severity: "",
        },
      ]);
    } else {
      setIsValid(false);
      // alert(
      //   "Please enter all details before added a new symptom. Thank you :) "
      // );
    }
  };

  const handleSymptomsRemove = (index) => {
    const list = [...symptomsList];
    list.splice(index, 1);
    setSymptomsList(list);
  };

  const handleSymptomsChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...symptomsList];
    list[index][name] = value;
    setSymptomsList(list);
  };

  const handleSeverityChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...symptomsList];
    list[index][name] = value;
    setSymptomsList(list);
  };

  const handleSubmit = () => {
    const list = [...symptomsList];

    // console.log("this is the last value " + list[list.length - 1].description);

    if (
      list[list.length - 1].description !== "" &&
      list[list.length - 1].severity !== ""
    ) {
      setModalState(true);
    } else {
      setIsValid(false);
    }
  };

  const handleFormSubmit = () => {
    axios
      .post("http://localhost:4000/api/visitRequest/newRequest", {
        withCredentials: true,
        hospitalId: hospitalID,
        symptomList: symptomsList,
        additionalInfo: additionalInfo,
      })
      .then((response) => {
        // console.log(response);
        setRequestSuccessValue(true);
      })
      .catch((err) => {
        console.log(err);
      });
    setNewRequestValue(true);
    // console.log("the form has been sent to backoffice!");
    navigate("/home");
  };

  const AlertModal = (props) => {
    return (
      <>
        <Modal {...props} centered>
          <Modal.Header className="modal-title">
            <Modal.Title>Attention!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-content">
            <p>
              This will be a disclaimer stating that the information entered is
              up to patient discretion. If they feel this is an emergency that
              is in need of urgent care, call 911.
            </p>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <div>
              <Button
                className="ack-btn"
                onClick={handleFormSubmit}
                variant="primary"
              >
                I Acknowledge
              </Button>
              <br />
              <a variant="link" className="cancel-lnk" onClick={props.onHide}>
                cancel request
              </a>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Container className="symptoms-container">
        {!isValid && (
          <Alert variant="danger" onClose={() => setIsValid(true)} dismissible>
            <Alert.Heading>
              Please enter all details before adding a new symptom. Thank you!
            </Alert.Heading>
          </Alert>
        )}

        <Row>
          <div className="title-div">
            <h2>Enter Symtoms</h2>
          </div>
        </Row>
        <Row>
          <div className="details-div">
            Please enter current symptoms along with severity of 1-5
          </div>
        </Row>
        <Row>
          <Col>
            <Form>
              {symptomsList.map((singleSymptom, index) => (
                <div key={index} className="group">
                  <InputGroup className="symptomGroup">
                    <Form.Control
                      type="text"
                      name="description"
                      placeholder="Enter Symptom"
                      value={singleSymptom.service}
                      onChange={(e) => handleSymptomsChange(e, index)}
                    />
                    <Form.Select
                      name="severity"
                      onChange={(e) => handleSeverityChange(e, index)}
                    >
                      <option defaultChecked>Severity</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Form.Select>

                    {symptomsList.length > 1 && (
                      <Button
                        className="remove-btn"
                        variant="outline-secondary"
                        onClick={() => handleSymptomsRemove(index)}
                      >
                        <span>x</span>
                      </Button>
                    )}
                  </InputGroup>
                  {symptomsList.length - 1 === index &&
                    symptomsList.length < 5 && (
                      <div className="add-btn-div">
                        <Button
                          className="add-btn btn-light"
                          onClick={() => handleSymptomsAdd(index)}
                        >
                          <span>Add Symptom</span>
                        </Button>
                      </div>
                    )}
                </div>
              ))}
              <div className="additional-info">
                <Form.Label>Additional Information</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </div>
              <div className="submit-btn-div">
                <Button className="submit-btn btn-light" onClick={handleSubmit}>
                  <span>Submit Symptoms</span>
                </Button>
                <div>
                  <a href="/hospitals"> &lt; previous step</a>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </>
  );
}

export default SymptomsForm;
