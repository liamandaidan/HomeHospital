import React, { useState, createContext } from "react";

export const PractitionerContext = createContext();

export const PractitionerProvider = (props) => {
  //useContext for patientId, patients additional info, patient symptoms.
  const [_id, set_id] = useState();
  const [additionalInfo, setAdditIonalInfo] = useState();
  const [symptomsInfo, setSymptomsInfo] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [patientList, setPatientList] = useState([]);
  const [requestList, setRequestList] = useState([]);

  return (
    <PractitionerContext.Provider
      value={{
        _id: [_id, set_id],
        additionalInfo: [additionalInfo, setAdditIonalInfo],
        symptomsInfo: [symptomsInfo, setSymptomsInfo],
        hidden: [hidden, setHidden],
        patientList: [patientList, setPatientList],
        requestList: [requestList, setRequestList],
      }}
    >
      {props.children}
    </PractitionerContext.Provider>
  );
};
