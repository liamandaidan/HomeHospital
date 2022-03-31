import React from 'react'
import { AdminContext } from "./AdminContext";

function ManagePractitioner() {
    //get all info from the context

    //get the user type that was select 
    const { userTypeSelection } = useContext(AdminContext);
    const [userType, setUserType] = userTypeSelection;

    //get the user id that was selected from the list 
    const { userSelectId } = useContext(AdminContext);
    const [userChoiceId, setUserChoiceId] = userSelectId;

  return (
    <div>ManagePractitioner</div>
  )
}

export default ManagePractitioner