import React from 'react';
import SymptomsForm from './components/SymptomsForm.js';
import Navigation from './components/Navigation.js';
import PatientInfo from './components/PatientInfo.js';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';


function App() {
  return (
    <>
      <Navigation />
      <Container>
    <Row>
      <Col>
        <Breadcrumb>
        <Breadcrumb.Item href='#'>Home</Breadcrumb.Item>
        <Breadcrumb.Item href='https://getbootstrap.com/docs/4.0/components/breadcrumb/'>
          Hospital
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Symptoms</Breadcrumb.Item>
      </Breadcrumb>
      </Col>
    </Row>
    <Row>
      <Col>
        <ProgressBar now={60} />
      </Col>
      <Col>
      </Col>
    </Row>
    <Row>
      <Col>
        <SymptomsForm />
      </Col>
      <Col>
      <PatientInfo />
      </Col>
    </Row>
      </Container>
    </>
  );
}

export default App;
