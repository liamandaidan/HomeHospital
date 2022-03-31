import React, { useState, createContext } from "react";
import { useAccordionButton } from "react-bootstrap";

export const AdminContext = createContext();

export const AdminProvider = (props) => {
  const [menuSelection, setMenuSelection] = useState("");
  const [userTypeSelection, setUserTypeSelection] = useState("");
  const [userSelectId, setUserSelectId] = useState("");

  return (
    <AdminContext.Provider
      value={{
        menuSelection: [menuSelection, setMenuSelection],
        userTypeSelection: [userTypeSelection, setUserTypeSelection],
        userSelectId: [userSelectId, setUserSelectId]

      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};