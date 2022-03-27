import React, { useEffect, useState } from "react";
import { Card, Container, ListGroup, Table } from "react-bootstrap";
import Users from "../data/users.json";

function ManageUser() {
  console.log(Users);
  // const obj =  JSON.parse(Users);
  // console.log(obj);

  return (
    <>
    <div className="manageuser-inner-div">
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.type}</td>
                <td><a>Edit</a></td>
                <td><a>Delete</a></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>

    </>
  );
}

export default ManageUser;
