import React from "react";
import "../styles/ErrorPageStyle.css";
import errorpageimg from "../images/404Picture.jpg";
import { Container, Row, Col } from "react-bootstrap";

/**
 * JSX for error 404 page.
 * @author Ridge Banez
 * @returns HTML page.
 */
function ErrorPage404() {
  return (
    <Container>
      <div className="fourOhFour-container">
        <Row className="align-items-center">
          <Col>
            <div className="column-left">
              <h1>404</h1>
              <h3>Oops! Page Not Found</h3>
              <p>Sorry, the page you are looking for does doesn't exist.</p>
              <a href="/" className="btnErrorPg">
                Return To Homepage
              </a>
            </div>
          </Col>
          <Col>
            <div className="column-right">
              <img
                src={errorpageimg}
                alt="Error_page_Image"
                className="errorimg"
              />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
export default ErrorPage404;
