import React, { useState, createContext } from "react";

export const AdminContext = createContext();

export const AdminProvider = (props) => {
  const [menuSelection, setMenuSelection] = useState("");

  return (
    <AdminContext.Provider
      value={{
        menuSelection: [menuSelection, setMenuSelection]
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};