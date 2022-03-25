import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/users/PatientInfoVisitRequest", {
        withCredentials: true,
      })
      .then((response) => {
        setAuthed(true);
      })
      .catch((err) => {
        console.log(err);
        setAuthed(false);
      });
  }, []);

  return authed === true ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
