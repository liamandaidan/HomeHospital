import React, {useEffect} from "react";
import { Container, Row, Col} from "react-bootstrap";
import Axios from "axios";
import HospitalFormStyle from "../styles/HospitalFormStyle.css";


function SelectHospital() {
	useEffect(() => {
		Axios.get("http://localhost:4000/api/medicalFacility/viewFacilities"
		)
		  .then((response) => {
			console.log(response);
		  })
		  .catch((err) => {
			console.log("Error:" + err);
		  })
	  }, [])

  return (
	<>
		<Container className="hospitalList-container">
			<Row>
				<div className="hospitalList-title">
					<h2>Select Hospital</h2>
				</div>
			</Row>
			<Row>
				<div className="hospitalChoice">
					<h2>Please select the hospital you would like to visit</h2>
				</div>
			</Row>
		</Container>
	</>

  )
}

export default SelectHospital;
