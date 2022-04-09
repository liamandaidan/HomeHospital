import React, { useState, createContext } from "react";

export const PractitionerContext = createContext();

export const PractitionerProvider = (props) => {
  const [_id, set_id] = useState();

  return (
    <PractitionerContext.Provider
      value={{
        _id: [_id, set_id],
      }}
    >
      {props.children}
    </PractitionerContext.Provider>
  );
};
