import React, { useState, createContext } from "react";

export const AdminContext = createContext();

export const AdminProvider = (props) => {
  const [displayUsers, setDisplayUsers] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        displayUsers: [displayUsers, setDisplayUsers]
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};