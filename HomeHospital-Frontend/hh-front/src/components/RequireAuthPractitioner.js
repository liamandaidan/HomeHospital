import axios from "axios";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";

/**
 * @name RequireAuth Component
 * @summary The RequireAuth component is used to authenticate practitioner users
 * it will make an api call to the backend and if successful that will mean that
 * the user is authenticate to go to that route and if not they will be logged
 * back to the home page.
 * @author Lance Gee
 */
function RequireAuth({ children }) {
  const [authed, setAuthed] = useState();

  useEffect(() => {
    // const timer = setTimeout(() => {
    //console.log(children);
    makePractitionerRequest();
    // }, 500);
  }, []);

  const makePractitionerRequest = () => {
    axios
      .get("http://localhost:4000/api/testP", {
        withCredentials: true,
      })
      .then((response) => {
        setAuthed(true);
      })
      .catch((err) => {
        //console.log(err);
        setAuthed(false);
      });
  };

 // console.log("Authed: " + authed);

  if (authed === undefined || authed === null) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return authed === true ? children : <Navigate to="/" replace />;
}

export default RequireAuth;
