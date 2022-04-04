import React, { useState, createContext } from "react";

export const PatientContext = createContext();

export const PatientProvider = (props) => {
  const [patientID, setPatientID] = useState(0);

  return (
    <PatientContext.Provider
      value={{
        patientID: [patientID, setPatientID],
      }}
    >
      {props.children}
    </PatientContext.Provider>
  );
};
