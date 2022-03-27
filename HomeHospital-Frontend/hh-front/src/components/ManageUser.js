import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import Users from "../data/users.json";

function ManageUser() {

    // console.log(Users)
    const obj =  JSON.parse(Users);

    console.log(obj);


  return (
    <>
        <p>Manage Users</p>
        <div>           
        {/* {obj.map((user) => {
            <ul>
                <li key={user.id}>{user.firstName}</li>
            </ul>
        })} */}
        </div>
    </>
  );
}

export default ManageUser;
