import React, {useEffect, useState} from "react";
import { Container, Row, Col} from "react-bootstrap";
import Axios from "axios";
import "../styles/HospitalSelectionStyles.css"

function SelectHospital() {
	const [posts , setPosts] = useState([])

	useEffect(() => {
		Axios.get("http://localhost:4000/api/medicalFacility/viewFacilities")
		.then(response => {
			console.log(response.data);
			setPosts(response.data);
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
				{posts.hospitalList?.map(post => <div>{post.hospitalName}</div>)}
			</Row>
		</Container>
	</>

  )
}

export default SelectHospital;
