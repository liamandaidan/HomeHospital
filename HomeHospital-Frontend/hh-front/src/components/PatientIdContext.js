import React, { useState, createContext } from "react";

export const PatientContext = createContext();
/**
 * @name Patient Context
 * @summary This is a useContext used for setting global states for the patientID
 * @author
 * @returns patientID global states.
 */
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
