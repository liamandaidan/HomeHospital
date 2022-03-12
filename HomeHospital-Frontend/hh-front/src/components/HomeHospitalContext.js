import React, { useState, createContext } from "react";

export const HomeHospitalContext = createContext();
export const PatientInfoContext = createContext();

export const HomeHospitalProvider = (props) => {
  const [_id, set_id] = useState();

  return (
    <HomeHospitalContext.Provider
      value={{
        _id: [_id, set_id],
      }}
    >
      {props.children}
    </HomeHospitalContext.Provider>
  );
};

export const PatientInfoProvider = (props) => {
  const [patient_id, setPatient_id] = useState();

  return (
    <PatientInfoProvider
      value={{
        patient_id: [patient_id, setPatient_id],
      }}>

    </PatientInfoProvider>

  )
}