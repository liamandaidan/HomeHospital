import React, { useState, createContext } from "react";
import { useAccordionButton } from "react-bootstrap";

export const AdminContext = createContext();

export const AdminProvider = (props) => {
  const [menuSelection, setMenuSelection] = useState("");
  const [userTypeSelection, setUserTypeSelection] = useState("");

  return (
    <AdminContext.Provider
      value={{
        menuSelection: [menuSelection, setMenuSelection],
        userTypeSelection: [userTypeSelection, setUserTypeSelection]

      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};