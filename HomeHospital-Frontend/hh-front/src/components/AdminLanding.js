import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "./AdminContext";
import "../styles/admin.css";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";


/**
 * Creates the admin landing component
 * @returns returns the langing page component
 */
function AdminLanding() {
  const { menuSelection } = useContext(AdminContext);

  const [menuChoice, setMenuChoice] = menuSelection;

  const [patientCount, setPatientCount] = useState(0);
  const [adminCount, setAdmincount] = useState(0);
  const [pracCount, setPracCount] = useState(0);

  /**
   * This useEffect will run once when the user arrives to the admin page, it will also load
   * the user count for the pratients, admin, and practitioners
   * If the connection is successfull, it will assign the count to each of the variable 
   * and display any errors if they occur 
   */
 useEffect(() => {
  axios
  .get("http://localhost:4000/api/admin/userCount")
  .then((response) => {
    setPatientCount(response.data.patients)
    setAdmincount(response.data.admins)
    setPracCount(response.data.practitioners)
  })
  .catch((err) => {
    console.log(err)
  })

 }, [])

  /**
   * This is the data that will be displayed in the pie chart describing the number of users in the system
   */
  const data = [
    {
      id: "Patients",
      label: "Patients",
      value: patientCount,
      color: "hsl(359, 70%, 50%)"
    },
    {
      id: "Practitioners",
      label: "practitioners",
      value: pracCount,
      color: "hsl(167, 70%, 50%)"
    },
    {
      id: "Admininistrators",
      label: "Administrators",
      value: adminCount,
      color: "hsl(102, 70%, 50%)"
    }
  ];

  /**
   * Pie creates a responsive pie chart that will display the amount of users on the system 
   * @returns a response pie chart that displays the count of patients, admins, and practitioners on the system 
   */

  const Pie = () => {
    return (
      <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: 'purple_red' }}
      borderWidth={1}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  0.2
              ]
          ]
      }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        slicesLabelRadiusMultiplier={1.5}
      />
    );
  };


  return (
    <>
      {menuChoice == "" && (
        <>
          <h1 className="adminGreeting">Welcome Administrator!</h1>
            <div className="currentUserDisplay">
            <p>Current user details</p>
              <div className="responsivePie">
                <Pie />
              </div>
            </div>
        </>
      )}
    </>
  );
}

export default AdminLanding;
