import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import PractionerHospitalSelect from "./PractionerHospitalSelect";

axios.defaults.withCredentials = true;

export default function PractionerWaitlist({ childToParent }) {
  /**
   * React hooks for data on waitlist side.
   */
  const [practPatientInfo, setPractPatientInfo] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [id, setId] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");
  const [hospitalSelected, setHospitalSelected] = useState("none");
  const [url, setUrl] = useState(
    "http://localhost:4000/api/requestManager/hospitalWaitList/"
  );
  const [flag, setFlag] = useState(false);

  /**
   * Here when a select component is updated we will update our url to reflect the changes.
   *
   * @param {*} childData passed in from select compomnent
   */
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
  };
  /**
   *This will be in control of the state of practitioner list. Here we will force updates on url
   *change and set timer.
   */
  useEffect(() => {
    /**
     * This will force an update when called.
     */
    if (!(hospitalSelected === "none")) {
      const callUpdate = () => {
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
      };
      //we call here when URL is updated.
      callUpdate();
      //here we call for a refresh every 60sec
      const interval = setInterval(() => {
        //this is called every 60 sec
        callUpdate();
      }, 60000);
      return () => clearInterval(interval);
    }
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
            <label>
              Please confirm check in for patient {selectedUsername} ?
            </label>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <div className="confirm-btn-div">
              <Button
                className="ack-btn"
                variant="primary"
                onClick={(e) => confirmCheckIn(id)}
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
        if (data.patient === e) {
          setId(e);
          setSelectedUsername(
            data.patientFirstName + " " + data.patientLastName
          );
          setModalState(true);
        }
      });
    }
  };

  //check in the user once confirmed
  const confirmCheckIn = () => {
    const checkInRoute =
      "http://localhost:4000/api/requestManager/completeRequest/";
    axios
      .post(checkInRoute, {
        withCredentials: true,
        patientId: id,
      })
      .then((response) => {
        setModalState(false);
        alert("Patient has been checked in");
        let prevUrl = url;
        setUrl("http://localhost:4000/api/requestManager/hospitalWaitList/");
        setUrl(prevUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //sends data from this route to the left side component
  function checkData(e) {
    childToParent(e.patient);
  }

  /**
   * This will be used to render table rows based off of a dummy json file i created
   */
  const DisplayTableRows = practPatientInfo.map((data) => {
    if (flag === false) {
      return (
        <>
          <tr>
            <td>{data.patient}</td>
            <td>{data.patientFirstName}</td>
            <td>{data.patientLastName}</td>
            <td>
              <Button
                value={data.patient}
                onClick={() => checkData(data)}
                className="detailBtn"
              >
                Select
              </Button>
            </td>
            <td>
              <Button
                onClick={(e) => handleCheckIn(data.patient)}
                className="checkInBtn"
              >
                Check In
              </Button>
            </td>
          </tr>
        </>
      );
    } else {
      return;
    }
  });
  /**
   * This is where the PractionerWaitlist is returned to parent component.
   */
  return (
    <div className="table-structure">
      <div className="select-hospital">
        <div className="form-floating">
          <PractionerHospitalSelect childToParent={updateHospitalState} />
        </div>
      </div>
      <div
        className="table-data"
        hidden={!(hospitalSelected !== "none" && !flag)}
      >
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th scope="col">Patient Request</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Details</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{DisplayTableRows}</tbody>
        </table>
      </div>
      <div className="alert alert-info" hidden={!flag}>
        There is no current data for this hospital.
      </div>
      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </div>
  );
}
