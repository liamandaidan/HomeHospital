import React, { useState, createContext } from "react";

export const HomeHospitalContext = createContext();

export const HomeHospitalProvider = (props) => {
  const [_id, set_id] = useState();
  const [patient_id, setPatient_id] = useState();
  const [request_id, setRequest_id] = useState();

  return (
    <HomeHospitalContext.Provider
      value={{
        patient_id: [patient_id, setPatient_id],
        _id: [_id, set_id],
        request_id: [request_id, setRequest_id],
      }}
    >
      {props.children}
    </HomeHospitalContext.Provider>
  );
};