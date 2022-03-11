import React, { useState, createContext } from "react";

export const HomeHospitalContext = createContext();

export const HomeHospitalProvider = (props) => {
  const [_id, set_id] = useState();

  return (
    <HomeHospitalContext.Provider
      value={{
        _id: [_id, set_id],
      }}
    >
      {props.childern}
    </HomeHospitalContext.Provider>
  );
};
