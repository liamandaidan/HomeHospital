import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";

/**
 * @name Login change
 * @summary component for changing login username and password for patients
 * @author
 */
function Login({ addForms }) {
  //2 pass state
  const submitForm = (event) => {
    addForms([username, password]);
    alert(`${username} + ${password}`);
    event.preventDefault();
  };

  //1 hooks
  const [username, changeUsername] = useState();
  const [password, changePassword] = useState();

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={submitForm}>
        <Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Username"
              onChange={(event) => changeUsername(event.target.value)}
              value={username}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={(event) => changePassword(event.target.value)}
              value={password}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Button type="submit">Submit form</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Login;
