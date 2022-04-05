import React, { useState, useEffect } from "react";
import { Button, Label, Modal } from "react-bootstrap";
import PatientData from "../data/patientData.json";
import axios from "axios";

export default function PractionerWaitlist({ childToParent }) {
  const [modalState, setModalState] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectHospital, setSelectHospital] = useState([
    "Rockyview",
    "Childrens",
    "Foothills",
  ]);

  const [practPatientInfo, setPractPatientInfo] = useState([]);

  const [hospital, setHospital] = useState("none");
  //this will map our selection of hospitals
  const Add = selectHospital.map((Add) => Add);
  /**
   * This will handle the selection of a hospitals use state and set the hospital.
   * TODO -> figure out how to pass in a key value of hospital ID. I am close.
   * @param {*} e event to be passed in
   */
  const handleHospitalChange = (e) => {
    console.clear();
    console.log(selectHospital[e.target.value]);
    setHospital(selectHospital[e.target.value]);
  };


  useEffect(() => {
    axios
	.get("http://localhost:4000/api/requestManager/hospitalWaitList/6216f18abaa205c9cab2f608")
	.then(
      (response) => {
        console.log(response.data);
		setPractPatientInfo(response.data);
      }
    );
  }, []);

//alert model when practitioner request to check in a user
  const AlertModal = (props) => {
    return (
      <>
        <Modal {...props} centered>
          <Modal.Header className="modal-title">
            <Modal.Title>Attention!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-content">
            <label>Please confirm check in for patient {selectedUser} ?</label>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <div className="confirm-btn-div">
              <Button
                className="ack-btn"
                variant="primary"
                onClick={confirmCheckIn}
              >
                Confirm Check In
              </Button>
              <br />
              <a className="cancel-lnk" onClick={props.onHide}>
                cancel
              </a>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  //check the id, display alert to confirm
  const handleCheckIn = (e) => {
    console.log("this is the id of the user to check in: " + e);
    {
		practPatientInfo.map((data) => {
        if (data._id === e) {
          setSelectedUser(data.patientFirstName +" "+ data.patientLastName);
          setModalState(true);
        }
      });
    }
  };

  //delete the user once confirmed
  const confirmCheckIn = () => {
    alert("Patient has been Checked in!");
    setModalState(false);
  };

  /**
   * This will be used to render table rows based off of a dummy json file i created
   */
  const DisplayTableRows = practPatientInfo.map((data) => {
    return (
      <tr>
        <td>{data.id}</td>
        <td>{data.patientFirstName}</td>
        <td>{data.patientLastName}</td>
        <td>
          <Button
            value={data.id}
            onClick={(e) => childToParent(e.target.value)}
          >
            Select
          </Button>
        </td>
        <td>
          <Button onClick={(e) => handleCheckIn(data._id)}>Check In</Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="table-structure">
      <div className="select-hospital">
        <div class="form-floating">
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            onChange={(e) => handleHospitalChange(e)}
          >
            <option selected hidden>Choose one:</option>
            {Add.map((address, key) => (
              <option key={key} value={key}>
                {address}
              </option>
            ))}
          </select>
          <label for="floatingSelect">Select a Hospital</label>
        </div>
      </div>
      <div className="table-data" hidden={!(hospital !== "none")}>
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
          <tbody>{DisplayTableRows}</tbody>
        </table>
      </div>
	<AlertModal show={modalState} onHide={() => setModalState(false)} />
    </div>
  );
}
