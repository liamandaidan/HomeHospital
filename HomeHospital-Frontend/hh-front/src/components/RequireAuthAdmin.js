import axios from "axios";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const [authed, setAuthed] = useState();

  useEffect(() => {
    // const timer = setTimeout(() => {
    console.log(children);
    makeAdminRequest();
    // }, 500);
  }, []);

  const makeAdminRequest = () => {
    axios
      .post("http://localhost:4000/api/admin/adminList", {
        withCredentials: true,
      })
      .then((response) => {
        setAuthed(true);
      })
      .catch((err) => {
        console.log(err);
        setAuthed(false);
      });
  };

  console.log("Authed: " + authed);

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
