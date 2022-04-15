import React, { useState, createContext } from "react";

export const AdminContext = createContext();

/**
 * @name AdminProvider component
 * @param props values return from the parent components
 * @returns values within the AdminContext.Provider to the props.childres
 * @author Robyn Balanag
 */
export const AdminProvider = (props) => {
  const [menuSelection, setMenuSelection] = useState("");
  const [userTypeSelection, setUserTypeSelection] = useState("");
  const [confirmCreate, setConfirmCreate] = useState(false);
  const [closeWindows, setCloseWindows] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        menuSelection: [menuSelection, setMenuSelection],
        userTypeSelection: [userTypeSelection, setUserTypeSelection],
        confirmCreate: [confirmCreate, setConfirmCreate],
        closeWindows: [closeWindows, setCloseWindows]

      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};