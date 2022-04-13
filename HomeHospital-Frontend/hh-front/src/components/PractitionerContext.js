import React, { useState, createContext } from "react";

export const PractitionerContext = createContext();

export const PractitionerProvider = (props) => {
  //useContext for patientId, patients additional info, patient symptoms.
  const [_id, set_id] = useState();
  const [additionalInfo, setAdditIonalInfo] = useState();
  const [symptomsInfo, setSymptomsInfo] = useState([]);
<<<<<<< HEAD
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [roleName, setRoleName] = useState();
=======
>>>>>>> parent of 5d565ea (Hide comp completed)

  return (
    <PractitionerContext.Provider
      value={{
        _id: [_id, set_id],
        additionalInfo: [additionalInfo, setAdditIonalInfo],
        symptomsInfo: [symptomsInfo, setSymptomsInfo],
<<<<<<< HEAD
        firstName: [firstName, setFirstName],
        lastName: [lastName, setLastName],
        roleName: [roleName, setRoleName],
=======
>>>>>>> parent of 5d565ea (Hide comp completed)
      }}
    >
      {props.children}
    </PractitionerContext.Provider>
  );
};
