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

function SymptomsForm() {
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState(0);

  const [symptomsList, setSymptomsList] = useState([
    {
      symptom: "",
      severity: 0,
    },
  ]);

  console.log(symptomsList);

  const handleSymptomsAdd = () => {
    setSymptomsList([
      ...symptomsList,
      {
        symptom: "",
        severity: 0,
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

    console.log(name, value);
    const list = [...symptomsList];
    list[index][name] = value;
    setSymptomsList(list);
  };

  const handleSeverityChange = (e) => {
    console.log(e);
  };

  return (
    <Container className="main-container">
      <Row>
        <h2>Enter Symtoms</h2>
      </Row>
      <Row>
        <p>Please enter current symptoms along with severity from 1-5</p>
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
                    value={singleSymptom.symptom.service}
                    onChange={(e) => handleSymptomsChange(e, index)}
                  />
                  <DropdownButton
                    className="severityDrop"
                    variant="outline-secondary"
                    title="Severity"
                    id="input-group-dropdown-2"
                    align="end"
                    name="severity"
                    onSelect={handleSeverityChange}
                  >
                    <Dropdown.Item eventKey="1">1</Dropdown.Item>
                    <Dropdown.Item eventKey="2">2</Dropdown.Item>
                    <Dropdown.Item eventKey="3">3</Dropdown.Item>
                  </DropdownButton>
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
          </Form>
        </Col>

        <Col>
          <div className="patientInfo">
            <div>This is where the client information will be displayed</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SymptomsForm;
