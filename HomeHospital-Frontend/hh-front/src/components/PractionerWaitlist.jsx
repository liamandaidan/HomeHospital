import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Axios } from "axios";
export default function PractionerWaitlist() {
  const [posts, setPosts] = useState("");

//   useEffect(() => {
//     //to be defined later!
//     Axios.get("http://localhost:4000/................").then((response) => {
//       console.log(response.data);
//       setPosts(response.data);   
//     });
//   }, []);

  return (
    <div>
      {/* This table class will be automatically generated.
Just used as an example for now */}
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Details</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <Button>Show</Button>
            </td>
            <td>
              <Button>Check in</Button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>{" "}
            <td>
              <Button>Show</Button>
            </td>
            <td>
              <Button>Check in</Button>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>{" "}
            <td>
              <Button>Show</Button>
            </td>
            <td>
              <Button>Check in</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
