import React, { useState, createContext } from "react";

export const HomeHospitalContext = createContext();
export const PatientInfoContext = createContext();

export const HomeHospitalProvider = (props) => {
  const [_id, set_id] = useState();
  const [patient_id, setPatient_id] = useState("62282b4e396f393a00115f5d");

  return (
    <HomeHospitalContext.Provider
      value={{
        _id: [_id, set_id],
        patient_id: [patient_id, setPatient_id],
      }}
    >
      {props.children}
    </HomeHospitalContext.Provider>
  );
};
