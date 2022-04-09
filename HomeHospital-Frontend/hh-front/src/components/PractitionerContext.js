import React, { useState, createContext } from "react";

export const PractitionerContext = createContext();

export const PractitionerProvider = (props) => {
  const [_id, set_id] = useState();
  const [additionalInfo, setAdditIonalInfo] = useState();
  const [symptomsInfo, setSymptomsInfo] = useState([]);

  return (
    <PractitionerContext.Provider
      value={{
        _id: [_id, set_id],
		additionalInfo: [additionalInfo, setAdditIonalInfo],
		symptomsInfo: [symptomsInfo, setSymptomsInfo],
      }}
    >
      {props.children}
    </PractitionerContext.Provider>
  );
};
