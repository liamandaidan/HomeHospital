import React, { useContext } from "react";
import { AdminContext } from "./AdminContext";
import "../styles/admin.css";
import Users from "../data/users.json";
import { Card } from "react-bootstrap";

function AdminLanding() {
  const { menuSelection } = useContext(AdminContext);
  // console.log(displayUsers);
  const [menuChoice, setMenuChoice] = menuSelection;

  return (
    <>
      {menuChoice == "" && (
        <>
          <h1 className="adminGreeting">Welcome Robyn!</h1>
          <div className="landing-grid">
              <Card className="card-1">
                  <Card.Title>Current Users</Card.Title>
                  <Card.Body>
                        <p>Total Users: {Users.length} </p>
                  </Card.Body>
              </Card>
              <Card className="card-2">
                  <Card.Title>Current Users</Card.Title>
                  <Card.Body>
                        <p>Total Users: {Users.length} </p>
                  </Card.Body>
              </Card>
              <Card className="card-3">
                  <Card.Title>Current Users</Card.Title>
                  <Card.Body>
                        <p>Total Users: {Users.length} </p>
                  </Card.Body>
              </Card>
          </div>
        </>
      )}
    </>
  );
}

export default AdminLanding;
