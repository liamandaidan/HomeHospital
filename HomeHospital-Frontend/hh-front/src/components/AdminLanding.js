import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "./AdminContext";
import "../styles/admin.css";
import Users from "../data/users.json";
import { Card } from "react-bootstrap";
import { ResponsivePie } from "@nivo/pie";

function AdminLanding() {
  const { menuSelection } = useContext(AdminContext);

  const [menuChoice, setMenuChoice] = menuSelection;
  const [userLength, setUserLength] = useState(0)

  const [adminList, setAdminList] = useState([]);

 useEffect(() => {
  setUserLength(Users.length);

 })



  //piechart to display users
  const data = [
    {
      id: "Patients",
      label: "Patients",
      value: 150,
      color: "hsl(359, 70%, 50%)"
    },
    {
      id: "Practitioners",
      label: "practitioners",
      value: 419,
      color: "hsl(167, 70%, 50%)"
    },
    {
      id: "Admininistrators",
      label: "Administrators",
      value: 407,
      color: "hsl(102, 70%, 50%)"
    }
  ];

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
