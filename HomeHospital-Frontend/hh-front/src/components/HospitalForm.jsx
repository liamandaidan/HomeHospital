import React, {useEffect} from "react";
import { Container, Row, Col} from "react-bootstrap";
import Axios from "axios";
import "../styles/HospitalSelectionStyles.css"

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
					<p>Select Hospital</p>
				</div>
			</Row>
			<Row>
	
			</Row>
		</Container>
	</>

  )
}

export default SelectHospital;
