import React, { useState, useEffect, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import PractionerHospitalSelect from "./PractionerHospitalSelect";
import { PractitionerContext } from "./PractitionerContext";
axios.defaults.withCredentials = true;

export default function PractionerWaitlist({ childToParent, refresh }) {
  //useContext here
  const { _id, additionalInfo, symptomsInfo} =
    useContext(PractitionerContext);

  //useContext patient id
  const [_idValue] = _id;
  //set state for additional info, and symptoms from route and is a useContext
  const [patientAdditionalInfo,setPatientAdditionalInfo] = additionalInfo;
  const [symptomsDetails,setSymptomDetails] = symptomsInfo;

  //modal state set to false
  const [modalState, setModalState] = useState(false);

  //patient id and setId used in check in button
  const [id, setId] = useState("");

  const [practPatientInfo, setPractPatientInfo] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [hospitalSelected, setHospitalSelected] = useState("none");
  const [url, setUrl] = useState(
    "http://localhost:4000/api/requestManager/hospitalWaitList/"
  );
  const [flag, setFlag] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const [hidden, setHidden] = useState(true);

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
  };
  /**
   *This will be in control of the state of practitioner list. Here we will force updates on url
   *change and set timer.
   */
  useEffect(() => {
    //This if statement will be used to halt the call until a hospital has been selected.
    if (!(hospitalSelected === "none")) {
      /**
       * This will force an update when called.
       */
      const callUpdate = () => {
        axios
          .get(url)
          .then((response) => {
            // console.log("Sending request to: " + url);
            // console.log(response.data);
            if (isCheckedIn) {
              setIsCheckedIn(false);
            }
            setPractPatientInfo(response.data);
            setFlag(false);
            // setIsCheckedIn(false);
          })
          .catch((err) => {
            console.log("No patient data at this time");
            setFlag(true);
          });
      };
      //we call here when URL is updated.
      callUpdate();
      //here we call for a refresh every 60sec
      const interval = setInterval(() => {
		refresh("Table requests updated");
        //this is called every 60 sec
        callUpdate();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [url, isCheckedIn]);

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
    // console.log("this is the id of the user to check in: " + e);
    {
      practPatientInfo.map((data) => {
        if (data.patient === e) {
          setId(e);
          setSelectedUsername(
            data.patientFirstName + " " + data.patientLastName
          );
          setModalState(true);
          //setUrl("http://localhost:4000/api/requestManager/hospitalWaitList/");
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
        setIsCheckedIn(true);
        childToParent("null");
      });
  };

  //sends data from this route to the left side component
  function checkData(e) {
    //sets symptom state and data and is in use with useContext
    setSymptomDetails(e.symptoms);
    childToParent(e.patient);
    //sets additionalInfo state and data and is in use with useContext
    setPatientAdditionalInfo(e.additionalInfo);

	setHidden(s => !s);
  }

 

  /**
   * This will be used to render table rows based off of a dummy json file i created
   *
   */
  const DisplayTableRows = practPatientInfo.map((data, i) => {
    if (flag === false) {
      return (
        <tr key={data.patient}>
          <td>{i}</td>
          <td>{data.patientFirstName}</td>
          <td>{data.patientLastName}</td>
          <td>
            {/*Select button grabs data from the route in the useEffect so that
             * it can be stored in useContext look at check data function
             */}
            <Button
              value={data.patient}
              onClick={() => checkData(data)}
              className="detailBtn"
            >
              Select
            </Button>
          </td>
          <td>
            {/*Passes patientId to the left component PractitionerPatientInfo.js*/}
            <Button
              onClick={(e) => handleCheckIn(data.patient)}
              className="checkInBtn"
            >
              Check In
            </Button>
          </td>
        </tr>
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
          <PractionerHospitalSelect childToParent={updateHospitalState}/>
        </div>
		{!hidden ? <p>This is a test</p> : null}
      </div>
      <div
        className="table-data"
        hidden={!(hospitalSelected !== "none" && !flag)}
      >
        <table className="table table-hover">
          <thead className="table-light">
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
      <div className="alert alert-info" hidden={!flag}>
        There is no current data for this hospital.
      </div>

      {/*Alert modal for when a practitioner checks in a patient. Currently hidden*/}
      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </div>
  );
}
