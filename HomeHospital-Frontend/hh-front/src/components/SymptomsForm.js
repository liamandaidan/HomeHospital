import React, { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/SymptomForm.css";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

function SymptomsForm() {
  const [symptomsList, setSymptomsList] = useState([
    {
      symptom: "",
      severity: "",
    },
  ]);

  console.log(symptomsList);

  const handleSymptomsAdd = () => {
    setSymptomsList([
      ...symptomsList,
      {
        symptom: "",
        severity: "",
      },
    ]);
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

  return (
    <Container className="symptoms-container">
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
              <>
                <InputGroup key={index} className="symptomGroup">
                  <Form.Control
                    type="text"
                    name="symptom"
                    placeholder="Enter Symptom"
                    value={singleSymptom.service}
                    onChange={(e) => handleSymptomsChange(e, index)}
                  />
                  <Form.Select name="severity" onChange={(e) => handleSeverityChange(e, index)}>
                    <option defaultChecked>Severity</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                  {/* <DropdownButton
                    className="severityDrop"
                    variant="outline-secondary"
                    title="Severity"
                    id="input-group-dropdown-2"
                    name="severity"
                    onSelect={(e) => handleSeverityChange(e, index)}
                  >
                    <Dropdown.Item eventKey="1">1</Dropdown.Item>
                    <Dropdown.Item eventKey="2">2</Dropdown.Item>
                    <Dropdown.Item eventKey="3">3</Dropdown.Item>
                  </DropdownButton> */}

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
                {symptomsList.length - 1 === index && symptomsList.length < 5 && (
                  <Button
                    className="add-btn btn-light"
                    onClick={handleSymptomsAdd}
                  >
                    <span>Add Symptom</span>
                  </Button>
                )}
              </>
            ))}
            <div className="additional-info">
              <Form.Label>Additional Information</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </div>
            <div>
              <Button className="submit-btn btn-light">
                <span>Submit Symptoms</span>
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SymptomsForm;
