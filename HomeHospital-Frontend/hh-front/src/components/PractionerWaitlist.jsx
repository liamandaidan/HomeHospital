import React, { useState, useEffect } from "react";
import { Button, Label, Modal } from "react-bootstrap";
import PatientData from "../data/patientData.json";
import axios from "axios";
import PractionerHospitalSelect from "./PractionerHospitalSelect";

axios.defaults.withCredentials = true;

export default function PractionerWaitlist({ childToParent }) {
  const [modalState, setModalState] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [practPatientInfo, setPractPatientInfo] = useState([]);
  const [hospitalSelected, setHospitalSelected] = useState("none");
  const [url, setUrl] = useState(
    "http://localhost:4000/api/requestManager/hospitalWaitList/"
  );
  const [flag, setFlag] = useState(false);
  const updateHospitalState = (childData) => {
    setHospitalSelected(childData);
    setUrl(
      "http://localhost:4000/api/requestManager/hospitalWaitList/" + childData
    );
    console.log(
      "current url is " +
        "http://localhost:4000/api/requestManager/hospitalWaitList/" +
        childData
    );
    //window.location.reload("true");
  };

  useEffect(() => {
    //here we need to change the URL depending on what part of the app we are at.
    //So a user needs to have a hospital selected first.
    axios
      .get(url)
      .then((response) => {
        console.log("Sending request to: " + url);
        console.log(response.data);
        setPractPatientInfo(response.data);
        setFlag(false);
      })
      .catch((err) => {
        console.log("THERE WAS AN ERROR FOUND: " + err);
        setFlag(true);
      });
  }, [url]);

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
          setSelectedUser(data.patientFirstName + " " + data.patientLastName);
          setModalState(true);
        }
      });
    }
  };

  //check in the user once confirmed
  const confirmCheckIn = () => {
    // axios.put(`http://localhost:4000/api/requestManager/completeRequest/`), {
    // 	withCredentials: true,
    // }
    alert("Patient has been Checked in!");
    setModalState(false);
  };

  /**
   * This will be used to render table rows based off of a dummy json file i created
   */
  const DisplayTableRows = practPatientInfo.map((data) => {
    if (flag === false) {
      return (
        <tr>
          <td>{data.id}</td>
          <td>{data.patientFirstName}</td>
          <td>{data.patientLastName}</td>
          <td>
            <Button
              value={data._id}
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
    } else {
      return;
    }
  });

  return (
    <div className="table-structure">
      <div className="select-hospital">
        <div class="form-floating">
          <PractionerHospitalSelect childToParent={updateHospitalState} />
        </div>
      </div>
      <div
        className="table-data"
        hidden={!(hospitalSelected !== "none" && !flag)}
      >
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
      <div class="alert alert-info" hidden={!flag}>     
        There is no current data for this hospital.
      </div>
      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </div>
  );
}
