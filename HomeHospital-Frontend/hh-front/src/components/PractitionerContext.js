import React, { useState, createContext } from "react";

export const PractitionerContext = createContext();

export const PractitionerProvider = (props) => {
  //useContext for patientId, patients additional info, patient symptoms.
  const [_id, set_id] = useState();
  const [additionalInfo, setAdditIonalInfo] = useState();
  const [symptomsInfo, setSymptomsInfo] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleName, setRoleName] = useState("");

  return (
    <PractitionerContext.Provider
      value={{
        _id: [_id, set_id],
        additionalInfo: [additionalInfo, setAdditIonalInfo],
        symptomsInfo: [symptomsInfo, setSymptomsInfo],
        hidden: [hidden, setHidden],
        firstName: [firstName, setFirstName],
        lastName: [lastName, setLastName],
        roleName: [roleName, setRoleName],
      }}
    >
      {props.children}
    </PractitionerContext.Provider>
  );
};
