import React, { useState, useEffect, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import PractionerHospitalSelect from "./PractionerHospitalSelect";
import { PractitionerContext } from "./PractitionerContext";
axios.defaults.withCredentials = true;

/**
 * @name PractitionerWaitlist
 * @summary This function will encompass the practitioner waitlist. In which it will display a rendered select list with all
 * institudes belonging to a practitioner. It will also render a table of requests to be displayed.
 * @param {string} childToParent this is the patient id passed between components.
 * @param {string} refresh this is used for letting our toast know that the table has been refreshed.
 * @author Liam McLaughlin, Ridge Banez
 * @returns the html to parent component.
 */
export default function PractionerWaitlist({ childToParent, refresh }) {
  //useContext here
<<<<<<< HEAD
  const { _id, additionalInfo, symptomsInfo } = useContext(PractitionerContext);
=======
  const { _id, additionalInfo, symptomsInfo} =
    useContext(PractitionerContext);
>>>>>>> parent of 5d565ea (Hide comp completed)

  //useContext patient id
  const [_idValue] = _id;
  //set state for additional info, and symptoms from route and is a useContext
<<<<<<< HEAD
  const [patientAdditionalInfo, setPatientAdditionalInfo] = additionalInfo;
  const [symptomsDetails, setSymptomDetails] = symptomsInfo;
=======
  const [patientAdditionalInfo,setPatientAdditionalInfo] = additionalInfo;
  const [symptomsDetails,setSymptomDetails] = symptomsInfo;
>>>>>>> parent of 5d565ea (Hide comp completed)

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

<<<<<<< HEAD
=======
  const [hidden, setHidden] = useState(true);

>>>>>>> parent of 5d565ea (Hide comp completed)
  /**
   * @function UpdateHospitalState Here when a select component is updated we will update our url to reflect the changes.
   * @param {string} childData consists of the hospital ID.
   */
  const updateHospitalState = (childData) => {
    setHospitalSelected(childData);
    setUrl(
      "http://localhost:4000/api/requestManager/hospitalWaitList/" + childData
    );
  };
  /**
   *@function useEffect This will be in control of the state of practitioner list. Here we will force updates on url
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
        //this is called every 60 sec
        refresh("Table requests updated");
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

  /**
   * @function handleCheckIn This function will handle the first stages of checking in a patient.
   * @param {string} e value passed from component
   */
  const handleCheckIn = (e) => {
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
  /**
   * @function confirmCheckIn This function will handle the routing of checking in a patient and submitting the request.
   */
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
  /**
   * @function checkData This function will send data from this component to parent components and child
   * components.
   * @param {*} e the array containing all patient info
   */
  function checkData(e) {
    //sets symptom state and data and is in use with useContext
    setSymptomDetails(e.symptoms);
    childToParent(e.patient);
    //sets additionalInfo state and data and is in use with useContext
    setPatientAdditionalInfo(e.additionalInfo);
<<<<<<< HEAD
=======

	setHidden(s => !s);
>>>>>>> parent of 5d565ea (Hide comp completed)
  }

  /**
   * @function DisplayTableRows This will be used to render table rows based off practitioner patient info retrieved.
   */
  const DisplayTableRows = practPatientInfo.map((data, i) => {
    if (flag === false) {
      return (
        <tr key={data.patient}>
          <td>{i}</td>
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
      <AlertModal show={modalState} onHide={() => setModalState(false)} />
    </div>
  );
}
